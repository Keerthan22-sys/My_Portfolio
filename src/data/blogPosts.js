const blogPosts = [
    {
        slug: 'fine-tuning-llms-qlora',
        title: 'Fine-Tuning LLMs with QLoRA — From Base Model to Domain Expert on a Free GPU',
        date: 'June 2026',
        readTime: '14 min read',
        tags: ['LLM', 'Fine-Tuning', 'QLoRA', 'DPO', 'RAG'],
        excerpt: 'A practical deep-dive into fine-tuning Llama 3.1 8B for Indian tax law using QLoRA, DPO alignment, and RAG — all on a free Colab T4. Covers when to fine-tune vs. prompt, the full pipeline, and lessons learned.',
        content: [
            {
                type: 'intro',
                text: 'I took a general-purpose Llama 3.1 8B model and turned it into an Indian Income Tax domain expert — using QLoRA for parameter-efficient fine-tuning, DPO for alignment, and RAG for grounding answers in real tax documents. The entire training pipeline runs on a free Google Colab T4 GPU. This post walks through why I built it, how each piece works, and what I learned along the way.',
            },
            {
                type: 'heading',
                text: 'When Should You Fine-Tune?',
            },
            {
                type: 'paragraph',
                text: 'Not every problem needs fine-tuning. Prompting and RAG handle most use cases — if you just need a model to answer questions using your documents, RAG is simpler and cheaper. Fine-tuning makes sense when you need the model to adopt a specific style, learn domain-specific reasoning patterns, or consistently follow structured output formats that prompting alone can\'t reliably achieve. For Indian tax law, the base model\'s knowledge was too shallow and its answers too generic — it needed to learn the domain\'s vocabulary, reasoning chains, and the nuance of tax provisions.',
            },
            {
                type: 'heading',
                text: 'The Problem with Full Fine-Tuning',
            },
            {
                type: 'paragraph',
                text: 'Full fine-tuning updates every parameter in the model. For an 8B parameter model at FP16, that\'s ~16 GB just for the weights, plus optimizer states (Adam keeps two copies), gradients, and activations — easily 60-80 GB of VRAM. That\'s an A100 minimum. For most practitioners, that\'s not accessible.',
            },
            {
                type: 'heading',
                text: 'LoRA: The Key Insight',
            },
            {
                type: 'paragraph',
                text: 'LoRA (Low-Rank Adaptation) is built on a beautiful observation: when you fine-tune a large model, the weight updates tend to be low-rank — meaning they can be decomposed into much smaller matrices. Instead of updating a weight matrix W directly, LoRA freezes W and trains two small matrices A and B such that the update is W + BA. If W is 4096×4096 (16M parameters) and you use rank 16, A is 4096×16 and B is 16×4096 — only 131K parameters. That\'s a 99% reduction in trainable parameters.',
            },
            {
                type: 'code',
                language: 'python',
                title: 'LoRA configuration — targeting attention layers',
                text: `from peft import LoraConfig

lora_config = LoraConfig(
    r=16,                    # rank — higher = more capacity
    lora_alpha=32,           # scaling factor
    target_modules=[         # which layers to adapt
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj",
    ],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
)`,
            },
            {
                type: 'heading',
                text: 'QLoRA: Adding Quantization',
            },
            {
                type: 'paragraph',
                text: 'QLoRA takes LoRA one step further — it quantizes the frozen base model to 4-bit precision using NormalFloat4 (NF4), a data type specifically designed for normally-distributed neural network weights. The base model drops from ~16 GB to ~4 GB in VRAM. The LoRA adapters still train in 16-bit precision for stability. The result: you can fine-tune a 7-8B model on a single consumer GPU or a free Colab T4 (16 GB VRAM).',
            },
            {
                type: 'code',
                language: 'python',
                title: 'Loading the model in 4-bit with Unsloth',
                text: `from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Meta-Llama-3.1-8B",
    max_seq_length=2048,
    dtype=None,           # auto-detect
    load_in_4bit=True,    # QLoRA — 4-bit quantization
)

model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                     "gate_proj", "up_proj", "down_proj"],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
)`,
            },
            {
                type: 'heading',
                text: 'Dataset: The Make-or-Break Step',
            },
            {
                type: 'paragraph',
                text: 'The model is only as good as its training data. I created a curated dataset of Indian Income Tax Q&A pairs covering tax slabs, deductions under Section 80C/80D, HRA exemptions, capital gains, and TDS provisions. Each example follows a structured instruction-input-output format. The dataset quality matters far more than quantity — 1,000 high-quality examples beat 10,000 noisy ones. I formatted everything into the Llama chat template so the model learns the domain within its existing conversational structure.',
            },
            {
                type: 'code',
                language: 'python',
                title: 'Dataset formatting for instruction tuning',
                text: `prompt_template = """Below is an instruction about Indian tax law.
Give an accurate, detailed response.

### Instruction:
{instruction}

### Input:
{input}

### Response:
{output}"""

def format_prompts(examples):
    texts = []
    for inst, inp, out in zip(
        examples["instruction"],
        examples["input"],
        examples["output"]
    ):
        text = prompt_template.format(
            instruction=inst, input=inp, output=out
        )
        texts.append(text + tokenizer.eos_token)
    return {"text": texts}`,
            },
            {
                type: 'heading',
                text: 'Training: SFT with Unsloth',
            },
            {
                type: 'paragraph',
                text: 'Supervised Fine-Tuning (SFT) is the first training stage. Using Unsloth — which patches HuggingFace transformers for 2x faster training and 60% less memory — the entire fine-tuning runs in about 30 minutes on a Colab T4. The key hyperparameters: learning rate of 2e-4, cosine scheduler with warmup, gradient accumulation to simulate larger batch sizes, and max 60 training steps for this demonstration.',
            },
            {
                type: 'code',
                language: 'python',
                title: 'SFT training configuration',
                text: `from trl import SFTTrainer
from transformers import TrainingArguments

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=2048,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=5,
        max_steps=60,
        learning_rate=2e-4,
        fp16=not is_bfloat16_supported(),
        bf16=is_bfloat16_supported(),
        logging_steps=1,
        optim="adamw_8bit",
        output_dir="outputs",
        lr_scheduler_type="cosine",
    ),
)

trainer.train()`,
            },
            {
                type: 'heading',
                text: 'DPO: Aligning the Model\'s Preferences',
            },
            {
                type: 'paragraph',
                text: 'After SFT, the model knows the domain but might still hallucinate or give verbose, unfocused answers. Direct Preference Optimization (DPO) fixes this by training the model on pairs of responses — one "chosen" (accurate, concise) and one "rejected" (hallucinated, vague). Unlike RLHF, DPO doesn\'t need a separate reward model — it optimises the policy directly from preference pairs. This is what turns a knowledgeable model into a reliable one.',
            },
            {
                type: 'code',
                language: 'python',
                title: 'DPO training — no reward model needed',
                text: `from trl import DPOTrainer, DPOConfig

dpo_trainer = DPOTrainer(
    model=model,
    ref_model=None,       # use implicit reference
    train_dataset=dpo_dataset,
    tokenizer=tokenizer,
    args=DPOConfig(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_ratio=0.1,
        num_train_epochs=3,
        learning_rate=5e-6,    # much lower than SFT
        fp16=True,
        logging_steps=1,
        optim="adamw_8bit",
        output_dir="dpo_outputs",
        beta=0.1,              # KL penalty strength
    ),
)

dpo_trainer.train()`,
            },
            {
                type: 'heading',
                text: 'RAG: Grounding in Real Documents',
            },
            {
                type: 'paragraph',
                text: 'Fine-tuning gives the model domain knowledge baked into its weights, but tax law changes every year. RAG (Retrieval-Augmented Generation) solves this by retrieving relevant sections from actual tax documents at inference time and injecting them into the prompt. The fine-tuned model + RAG combination is powerful: the model understands the domain deeply enough to reason about retrieved context correctly, while RAG ensures answers are grounded in current legislation.',
            },
            {
                type: 'heading',
                text: 'Serving: FastAPI Endpoint',
            },
            {
                type: 'paragraph',
                text: 'The final piece is a FastAPI endpoint that loads the fine-tuned model with the merged LoRA weights and serves predictions. The model is published on HuggingFace so anyone can download and run it. In production, you\'d add caching, rate limiting, and potentially vLLM for batched inference — but for a demonstration, a straightforward FastAPI server gets the job done.',
            },
            {
                type: 'heading',
                text: 'The Full Pipeline at a Glance',
            },
            {
                type: 'list',
                items: [
                    'Dataset creation — curate high-quality instruction-output pairs in your domain.',
                    'QLoRA setup — load base model in 4-bit, attach LoRA adapters to attention + MLP layers.',
                    'SFT — supervised fine-tuning on your dataset. This teaches domain knowledge.',
                    'DPO — preference alignment on chosen/rejected pairs. This reduces hallucination.',
                    'RAG — retrieval layer over source documents for grounded, up-to-date answers.',
                    'Serving — FastAPI endpoint with the merged model, published on HuggingFace.',
                ],
            },
            {
                type: 'heading',
                text: 'Key Takeaways',
            },
            {
                type: 'list',
                items: [
                    'QLoRA makes fine-tuning accessible — 8B models on a free T4, no A100 required.',
                    'Dataset quality > quantity. A thousand clean examples beat ten thousand noisy ones.',
                    'LoRA rank 16 is a strong default. Go higher only if you see underfitting.',
                    'DPO is simpler than RLHF and works surprisingly well for reducing hallucination.',
                    'Fine-tuning + RAG is better than either alone. Fine-tuning teaches reasoning; RAG provides current facts.',
                    'Unsloth cuts training time in half. There\'s no reason not to use it for single-GPU training.',
                ],
            },
            {
                type: 'paragraph',
                text: 'The full code, notebooks, and the published model are all open source. Clone the repo, open the Colab notebook, and you can have a fine-tuned domain expert running in under an hour.',
            },
        ],
        projects: [
            {
                name: 'Fine-Tune-with-QLoRA',
                link: 'https://github.com/Keerthan22-sys/Fine-Tune-with-QLoRA',
            },
        ],
        resources: [
            {
                category: 'Video Source',
                items: [
                    {
                        name: 'Aishwarya Srinivasan — Fine-Tuning Deep Dive',
                        url: 'https://www.youtube.com/watch?v=Wx1oiBCmxjY',
                        note: 'Primary learning source for the project',
                    },
                ],
            },
            {
                category: 'Must-Read Guides',
                items: [
                    {
                        name: 'Google Cloud — Fine-tuning LLMs Overview',
                        url: 'https://cloud.google.com/use-cases/fine-tuning-ai-models',
                        note: 'Best conceptual overview with challenges & solutions',
                    },
                    {
                        name: 'Unsloth — Fine-tuning LLMs Guide',
                        url: 'https://unsloth.ai/docs/get-started/fine-tuning-llms-guide',
                        note: 'Practical getting-started guide with notebooks',
                    },
                    {
                        name: 'SitePoint — Fine-Tune Local LLMs 2026',
                        url: 'https://www.sitepoint.com/fine-tune-local-llms-2026/',
                        note: 'Full workflow: dataset prep → training → export → inference',
                    },
                ],
            },
            {
                category: 'Research Papers',
                items: [
                    {
                        name: 'LoRA Paper (Hu et al., 2021)',
                        url: 'https://arxiv.org/abs/2106.09685',
                        note: 'Foundational — low-rank adaptation for large models',
                    },
                    {
                        name: 'QLoRA Paper (Dettmers et al., 2023)',
                        url: 'https://arxiv.org/abs/2305.14314',
                        note: '4-bit quantization + LoRA = fine-tune 65B on single GPU',
                    },
                    {
                        name: 'DPO Paper (Rafailov et al., 2023)',
                        url: 'https://arxiv.org/abs/2305.18290',
                        note: 'Eliminates reward model — preference optimization directly',
                    },
                ],
            },
            {
                category: 'Fine-Tuning APIs (Closed Source)',
                items: [
                    {
                        name: 'OpenAI Fine-Tuning',
                        url: 'https://platform.openai.com/docs/guides/fine-tuning',
                        note: 'API-based, no GPU needed',
                    },
                    {
                        name: 'Google Vertex AI',
                        url: 'https://cloud.google.com/vertex-ai',
                        note: 'Managed fine-tuning for Gemini models',
                    },
                    {
                        name: 'Anthropic',
                        url: 'https://www.anthropic.com/',
                        note: 'Claude fine-tuning capabilities',
                    },
                ],
            },
        ],
    },
    {
        slug: 'kubernetes-for-beginners',
        title: 'Kubernetes for Beginners — From "What Is a Pod?" to a Self-Healing, Multi-Tier App',
        date: 'May 2026',
        readTime: '12 min read',
        tags: ['Kubernetes', 'Docker', 'DevOps', 'Infrastructure'],
        excerpt: 'A hands-on guide to Kubernetes fundamentals — built from two real projects I shipped. Covers pods, deployments, services, ConfigMaps, Ingress, self-healing, and scaling.',
        content: [
            {
                type: 'intro',
                text: 'I learned Kubernetes by building two projects back-to-back: a fault-tolerant web app that heals itself when pods crash, and a two-tier Rails + PostgreSQL deployment wired together with service discovery. This post distills everything I learned into a single beginner\'s guide — no theory-only fluff, every concept tied to something I actually ran on a real cluster.',
            },
            {
                type: 'heading',
                text: 'Why Kubernetes?',
            },
            {
                type: 'paragraph',
                text: 'A single container running your app is fragile. If it crashes at 3 AM, your site is down until someone manually restarts it. Kubernetes solves three problems that Docker alone can\'t: self-healing (crashed containers restart automatically), horizontal scaling (spin up more replicas with one command), and service discovery (containers find each other by name, not IP address).',
            },
            {
                type: 'heading',
                text: 'The Mental Model: Pods, Deployments, Services',
            },
            {
                type: 'paragraph',
                text: 'A Pod is the smallest deployable unit — think of it as a wrapper around one or more containers. You almost never create pods directly. Instead, you create a Deployment, which manages a set of identical pods (replicas) and ensures the desired count is always running. A Service gives those pods a stable network identity — a DNS name that never changes, even when pods are replaced.',
            },
            {
                type: 'code',
                language: 'yaml',
                title: 'deployment.yaml — 5 self-healing replicas',
                text: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 5
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web-app
          image: your-image:latest
          ports:
            - containerPort: 3000
      restartPolicy: Always    # self-healing`,
            },
            {
                type: 'paragraph',
                text: 'That restartPolicy: Always is the line that separates "site goes down at 3 AM" from "site fixes itself at 3 AM." Kubernetes monitors every pod and restarts any that crash. You can test this yourself — delete a pod with kubectl delete pod <name> and watch the replica count snap right back to 5.',
            },
            {
                type: 'heading',
                text: 'Scaling: The Grocery Store Analogy',
            },
            {
                type: 'paragraph',
                text: 'Five replicas is like a grocery store with 5 checkout lanes. If one lane closes (a pod dies), customers (traffic) flow to the other 4 with zero disruption. And you can resize on the fly:',
            },
            {
                type: 'code',
                language: 'bash',
                title: 'Scale up and down in seconds',
                text: `kubectl scale --replicas=7 -f deployment.yaml   # scale up
kubectl scale --replicas=3 -f deployment.yaml   # scale down`,
            },
            {
                type: 'heading',
                text: 'Services: ClusterIP vs NodePort',
            },
            {
                type: 'paragraph',
                text: 'This is where most beginners get confused. A ClusterIP service is internal-only — reachable only from inside the cluster, like an office intercom. Perfect for databases. A NodePort service opens a port on the host machine so external traffic can reach your app. In my Rails + PostgreSQL project, PostgreSQL uses ClusterIP (no one outside should talk to the DB directly) and the Rails app uses NodePort (users need to reach it).',
            },
            {
                type: 'heading',
                text: 'ConfigMaps: Configuration as a Separate Resource',
            },
            {
                type: 'paragraph',
                text: 'Hardcoding database credentials into your app image is a recipe for pain. A ConfigMap pulls configuration out of the code and into a cluster resource that multiple deployments can share. Think of it as a sticky note of settings taped to the outside of the app rather than written into the source code — change the note once and both containers pick it up.',
            },
            {
                type: 'code',
                language: 'yaml',
                title: 'configmap.yaml — shared config for both tiers',
                text: `apiVersion: v1
kind: ConfigMap
metadata:
  name: database-configmap
data:
  POSTGRES_SVC: "database-svc"      # DB's service name = hostname
  POSTGRES_PORT: "5432"
  POSTGRES_DB: "myapp_development"
  POSTGRES_USER: "postgres"
  POSTGRES_PASSWORD: "secret"`,
            },
            {
                type: 'paragraph',
                text: 'Both deployments consume this with a single envFrom: configMapRef. The Rails app connects to the database using the service name as the hostname — Kubernetes\' internal DNS resolves it to whichever PostgreSQL pod is currently running. No hardcoded IPs anywhere.',
            },
            {
                type: 'heading',
                text: 'Ingress: A Single Front Door',
            },
            {
                type: 'paragraph',
                text: 'Without an Ingress, every service needs its own external port — messy and hard to manage. The NGINX Ingress Controller acts like a hotel reception desk: all guests (HTTP requests) arrive at one door, and reception routes them to the right room (service) based on the URL path. In production, you\'d have paths like /api, /admin, /docs each routing to different backend services.',
            },
            {
                type: 'heading',
                text: 'The Proof: Break It and Watch It Heal',
            },
            {
                type: 'code',
                language: 'bash',
                title: 'Fault tolerance experiments you can run yourself',
                text: `# See all 5 replicas running
kubectl get pods

# Kill a pod — Kubernetes immediately replaces it
kubectl delete pod <any-pod-name>
kubectl get pods    # still 5 pods

# Watch in real-time
kubectl get pods -w &
kubectl delete pod <pod-name>
# Old pod: Terminating → New pod: ContainerCreating → Running`,
            },
            {
                type: 'heading',
                text: 'Key Takeaways',
            },
            {
                type: 'list',
                items: [
                    'Pods are disposable. Design for it. restartPolicy: Always is non-negotiable.',
                    'Services give pods a stable identity. Never reference pod IPs directly.',
                    'ConfigMaps separate configuration from code. One source of truth, consumed everywhere.',
                    'ClusterIP for internal services (databases). NodePort/LoadBalancer for external.',
                    'Ingress consolidates external access into a single entry point with path-based routing.',
                    'Start with kind for local clusters. It\'s the fastest way from zero to a running cluster.',
                ],
            },
            {
                type: 'paragraph',
                text: 'Both projects are on my GitHub with full manifests you can kubectl apply and start experimenting with. The best way to learn Kubernetes is to break things and watch them heal.',
            },
        ],
        projects: [
            {
                name: 'fault-tolerant-web-hosting-on-kubernetess',
                link: 'https://github.com/Keerthan22-sys/fault-tolerant-web-hosting-on-kubernetess',
            },
            {
                name: 'Ruby-on-Rails-over-Kubernetss',
                link: 'https://github.com/Keerthan22-sys/Ruby-on-Rails-over-Kubernetss',
            },
        ],
        resources: [
            {
                category: 'Deep Dives & Architecture',
                items: [
                    {
                        name: 'Kubernetes Deployment Strategies Explained',
                        url: 'https://www.tech5ense.com/p/kubernetes-deployment-strategies-explained',
                        note: 'Rolling updates, blue-green, canary — when to use each',
                    },
                    {
                        name: '7 Kubernetes Layers Every Engineer Should Know',
                        url: 'https://www.tech5ense.com/p/7-kubernetes-layers-every-engineer-should-know',
                        note: 'Full architecture breakdown from infrastructure to application',
                    },
                    {
                        name: 'Advanced Kubernetes Explained',
                        url: 'https://www.tech5ense.com/p/advanced-kubernetes-explained',
                        note: 'Beyond the basics — networking, storage, security',
                    },
                    {
                        name: 'Containerization & Kubernetes in the AI Era',
                        url: 'https://www.tech5ense.com/p/week-4-containerization-kubernetes-in-the-ai-era',
                        note: 'How K8s fits into modern AI/ML infrastructure',
                    },
                ],
            },
            {
                category: 'Video Source',
                items: [
                    {
                        name: 'Kubernetes Crash Course',
                        url: 'https://youtu.be/H_a5DTKSEjY?si=9Ut7L6vbPEIA-TSH',
                        note: 'Visual walkthrough of core K8s concepts',
                    },
                ],
            },
        ],
    },
];

export default blogPosts;
