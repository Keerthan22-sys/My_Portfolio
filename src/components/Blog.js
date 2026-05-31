import { HiArrowRight, HiClock, HiCalendar } from 'react-icons/hi';

const posts = [
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
    },
];

const Blog = () => {
    return (
        <section id="blog" className="section">
            <div className="section-inner">
                <div className="section-eyebrow">Writing</div>
                <h2 className="section-title">Blog</h2>
                <p className="section-lead">
                    Technical deep-dives on what I learn while building. If I can't explain
                    it clearly, I don't understand it well enough.
                </p>

                <div className="blog-posts">
                    {posts.map((post) => (
                        <article key={post.slug} className="blog-post" id={post.slug}>
                            {/* Header */}
                            <div className="blog-post-header">
                                <h3 className="blog-post-title">{post.title}</h3>
                                <div className="blog-post-meta">
                                    <span className="blog-meta-item">
                                        <HiCalendar /> {post.date}
                                    </span>
                                    <span className="blog-meta-item">
                                        <HiClock /> {post.readTime}
                                    </span>
                                </div>
                                <div className="blog-post-tags">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="blog-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="blog-post-body">
                                {post.content.map((block, i) => {
                                    switch (block.type) {
                                        case 'intro':
                                            return <p key={i} className="blog-intro">{block.text}</p>;
                                        case 'heading':
                                            return <h4 key={i} className="blog-heading">{block.text}</h4>;
                                        case 'paragraph':
                                            return <p key={i} className="blog-paragraph">{block.text}</p>;
                                        case 'code':
                                            return (
                                                <div key={i} className="blog-code-block">
                                                    <div className="blog-code-header">
                                                        <span className="blog-code-lang">{block.language}</span>
                                                        <span className="blog-code-title">{block.title}</span>
                                                    </div>
                                                    <pre className="blog-code"><code>{block.text}</code></pre>
                                                </div>
                                            );
                                        case 'list':
                                            return (
                                                <ul key={i} className="blog-list">
                                                    {block.items.map((item, j) => (
                                                        <li key={j}>{item}</li>
                                                    ))}
                                                </ul>
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            </div>

                            {/* Related projects */}
                            {post.projects && (
                                <div className="blog-post-projects">
                                    <span className="blog-projects-label">Built while writing this:</span>
                                    {post.projects.map((proj) => (
                                        <a
                                            key={proj.name}
                                            href={proj.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="blog-project-link"
                                        >
                                            {proj.name} <HiArrowRight />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
