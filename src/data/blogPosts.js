const blogPosts = [
    {
        slug: 'cybersecurity-for-backend-engineers',
        title: 'A Cybersecurity Course, Distilled — What Actually Makes You a Better Backend Engineer',
        date: 'July 2026',
        readTime: '10 min read',
        tags: ['Security', 'Backend', 'STRIDE', 'Authentication', 'Node.js'],
        excerpt: 'Notes from Scrimba\'s Learn Cybersecurity course, rebuilt around the mental models that made it stick: STRIDE threat modeling, the three identity strategies, input validation with Zod, parameterized queries, and the four rate-limiting algorithms — with Node.js snippets for each.',
        content: [
            {
                type: 'intro',
                text: 'I completed Scrimba\'s Learn Cybersecurity course — four modules, dozens of hands-on challenges, real Node.js implementations of every concept. Security always felt like a specialist topic I would "get to later." The course changed that framing. Security is not a separate discipline; it is a quality of thinking that runs through every design decision a backend engineer makes, from how you model a feature to how you handle a POST request. Here is the full breakdown, module by module, with the mental models that made it click.',
            },
            {
                type: 'heading',
                text: 'The Core Reframe: Design Time vs Runtime',
            },
            {
                type: 'paragraph',
                text: 'Security work splits into two phases. Most developers only think about security when something breaks in production — that is runtime thinking. Professionals also think about it at the whiteboard, before any code exists — that is design-time thinking. Two frameworks map cleanly onto these phases: STRIDE for design time, the OWASP Top 10 for runtime.',
            },
            {
                type: 'heading',
                text: 'Module 1 — Think Like an Attacker, Design Like a Defender',
            },
            {
                type: 'paragraph',
                text: 'Microsoft created STRIDE to help teams spot threats during the design phase, before a single line of code is written. It is a six-category checklist that forces you to look at a feature from the attacker\'s perspective. Each letter names a threat and the security property it violates. Using a food delivery app as the running example:',
            },
            {
                type: 'list',
                items: [
                    'Spoofing — pretending to be someone else (violates Authentication). A driver client presents another driver\'s identity to grab their orders.',
                    'Tampering — modifying data in transit or at rest (violates Integrity). The client edits the order total in the request body before it reaches the server.',
                    'Repudiation — denying an action with no evidence to the contrary (violates Non-repudiation). A customer claims they never placed an order and there are no audit logs.',
                    'Information disclosure — exposing data to people who should not see it (violates Confidentiality). The order-status endpoint returns another customer\'s address.',
                    'Denial of service — making the system unavailable (violates Availability). An attacker floods the "place order" endpoint until it falls over.',
                    'Elevation of privilege — gaining capabilities you should not have (violates Authorization). A regular user calls the admin-only "issue refund" endpoint.',
                ],
            },
            {
                type: 'paragraph',
                text: 'The key insight: STRIDE is not a one-time exercise, it is a habit. Run through the six categories on every new feature before you write the implementation. It takes five minutes and catches entire classes of vulnerabilities before they become incidents.',
            },
            {
                type: 'paragraph',
                text: 'Where STRIDE helps you predict, the OWASP Top 10 helps you recognize and fix. It is a list of the most commonly exploited web vulnerabilities, updated periodically from real-world incident data — the runtime complement to STRIDE\'s design-time thinking.',
            },
            {
                type: 'heading',
                text: 'Module 2 — Authentication and Identity',
            },
            {
                type: 'paragraph',
                text: 'First, the distinction that trips up almost every junior developer. Authentication is proving who you are. Authorization is proving what you are allowed to do. They usually work together but are entirely separate systems — confusing them is how you get bugs where authenticated users can read each other\'s data.',
            },
            {
                type: 'paragraph',
                text: 'There are three identity models every backend engineer needs to understand, and most production systems use all three in different parts of the same application:',
            },
            {
                type: 'list',
                items: [
                    'Stateful (sessions) — the server stores a session record; the client holds an opaque session ID. Easy to revoke instantly, but session storage has to scale with your traffic. Best for traditional web apps.',
                    'Stateless (JWT) — the server signs a token containing the claims and stores nothing; any instance can verify it with the key. Scales horizontally with zero shared state, but you cannot easily revoke a token before it expires. Best for APIs and microservices.',
                    'Delegated (OAuth) — a third-party identity provider authenticates the user and hands you a token. You never store passwords at all. Best when integrating with external providers or when you simply should not be holding credentials.',
                ],
            },
            {
                type: 'code',
                language: 'javascript',
                title: 'Stateless auth — JWT verification middleware (Express)',
                text: `import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
    const header = req.headers.authorization ?? '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'missing token' });

    try {
        // Verifies signature AND expiry. Never decode without verifying.
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ error: 'invalid token' });
    }
}

// Authorization is a separate check — after authentication:
export const requireRole = (role) => (req, res, next) =>
    req.user?.role === role
        ? next()
        : res.status(403).json({ error: 'forbidden' });`,
            },
            {
                type: 'heading',
                text: 'Module 3 — Input & Data Safety',
            },
            {
                type: 'paragraph',
                text: 'The majority of the OWASP Top 10 comes down to one root cause: user input that is not validated or sanitized before being processed. Two attack types dominate.',
            },
            {
                type: 'paragraph',
                text: 'Cross-Site Scripting (XSS) is when an attacker injects JavaScript that then runs in other users\' browsers. The classic case is a comment box that does not sanitize input, so an attacker posts <script>...</script> as a "comment" and every user who loads the page runs their code. The defense: escape HTML special characters before rendering, set a Content Security Policy header, and never assume a string is safe just because it came from your own database.',
            },
            {
                type: 'paragraph',
                text: 'SQL injection is when input breaks out of the expected string and rewrites the query itself. The textbook example is a login field that accepts \' OR \'1\'=\'1, turning the WHERE clause into something that is always true. Parameterized queries close this off completely — the driver sends the query structure and the values separately, so input can never become syntax.',
            },
            {
                type: 'code',
                language: 'javascript',
                title: 'String-built query vs parameterized query',
                text: `// Vulnerable — input becomes part of the SQL text
db.query(\`SELECT * FROM users
          WHERE email = '\${email}' AND pass = '\${pass}'\`);
//  email = "' OR '1'='1" -> returns every row

// Safe — values are bound, never parsed as SQL
db.query(
    'SELECT * FROM users WHERE email = $1 AND pass = $2',
    [email, pass],
);`,
            },
            {
                type: 'paragraph',
                text: 'The course uses Zod as the practical tool for enforcing what valid input looks like at the API boundary. You define a schema once; Zod validates every incoming request against it and infers the TypeScript types from the same definition. The middleware you write here is the same pattern production teams use.',
            },
            {
                type: 'code',
                language: 'javascript',
                title: 'Schema-first validation at the boundary (Zod + Express)',
                text: `import { z } from 'zod';

const CreateOrder = z.object({
    restaurantId: z.string().uuid(),
    items: z.array(z.object({
        sku: z.string(),
        qty: z.number().int().positive().max(50),
    })).min(1),
    note: z.string().max(280).optional(),
});

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.flatten() });
    }
    req.body = result.data;   // now typed and trusted
    next();
};

app.post('/orders', validate(CreateOrder), createOrderHandler);`,
            },
            {
                type: 'paragraph',
                text: 'The rule that prevents most injection attacks: never trust data that came from outside your system. Validate at the boundary, sanitize before rendering, use parameterized queries every time. Those three habits close most of the OWASP input-handling attack surface.',
            },
            {
                type: 'heading',
                text: 'Module 4 — Rate Limiting & Throttling',
            },
            {
                type: 'paragraph',
                text: 'Rate limiting is the last line of defense against abuse and the most underappreciated. Without it, an attacker can brute-force your login endpoint indefinitely, scrape your entire API, or flood your service into a denial of service. There are four main algorithms:',
            },
            {
                type: 'list',
                items: [
                    'Fixed window — count requests per fixed bucket (100 per minute). Trivial to implement, but allows a double burst across the window boundary.',
                    'Sliding window — weight the previous window or keep timestamped logs so the limit moves continuously. Smooths the boundary burst at the cost of more memory.',
                    'Token bucket — the bucket refills at a steady rate; each request spends a token; requests are allowed as long as tokens remain. Permits controlled bursts. A strong default for APIs.',
                    'Leaky bucket — requests queue and drain at a fixed rate, producing a perfectly smooth output with no bursts. Good for shielding a fragile downstream system.',
                ],
            },
            {
                type: 'paragraph',
                text: 'You also have to decide who to limit against: by IP address (easy to spoof or rotate), by user ID (requires auth, bypassed with throwaway accounts), or by API key / session ID (most reliable for authenticated APIs). In practice you layer them — limit by IP at the infrastructure level and by user ID at the application level.',
            },
            {
                type: 'code',
                language: 'javascript',
                title: 'Token bucket — the algorithm in ~15 lines',
                text: `class TokenBucket {
    constructor(capacity, refillPerSec) {
        this.capacity = capacity;
        this.tokens = capacity;
        this.refillPerSec = refillPerSec;
        this.last = Date.now();
    }
    take(n = 1) {
        const now = Date.now();
        this.tokens = Math.min(
            this.capacity,
            this.tokens + ((now - this.last) / 1000) * this.refillPerSec,
        );
        this.last = now;
        if (this.tokens >= n) { this.tokens -= n; return true; }
        return false;   // rejected -> respond 429
    }
}

const buckets = new Map();   // key: userId or IP
function allow(key) {
    if (!buckets.has(key)) buckets.set(key, new TokenBucket(20, 5));
    return buckets.get(key).take();
}`,
            },
            {
                type: 'heading',
                text: 'What I\'m Taking Away',
            },
            {
                type: 'list',
                items: [
                    'Security is a design habit, not a checklist. Running STRIDE at the start of every feature costs five minutes; fixing a privilege-escalation bug in production costs far more.',
                    'Most attacks exploit the same root cause — untrusted input treated as trusted code. XSS, SQL injection, SSRF are all variations of it. Validate at the boundary, every time.',
                    'The three auth models have different failure modes. Sessions revoke easily but do not scale; JWTs scale but resist revocation; OAuth is right when you should not hold passwords at all. Know which you are using and why.',
                    'Rate limiting without client identification is incomplete. By IP is bypassed by rotating IPs; by user ID is bypassed by throwaway accounts. Layer them.',
                    'Zod is the gap between knowing about input validation and actually doing it. Define the schema once, apply it at every boundary.',
                ],
            },
            {
                type: 'paragraph',
                text: 'The hands-on challenges are what made it stick — you cannot fake understanding while you are implementing a token bucket or debugging a JWT verification failure. If you are a backend engineer who has been treating security as someone else\'s job, it is worth four hours.',
            },
        ],
        resources: [
            {
                category: 'The Course',
                items: [
                    {
                        name: 'Scrimba — Learn Cybersecurity',
                        url: 'https://scrimba.com/learn-cybersecurity-c0ggmpl7f9',
                        note: 'Four modules, hands-on Node.js challenges — free tier available',
                    },
                ],
            },
            {
                category: 'Threat Modeling & Vulnerabilities',
                items: [
                    {
                        name: 'OWASP Top 10',
                        url: 'https://owasp.org/www-project-top-ten/',
                        note: 'The runtime checklist — updated from real incident data',
                    },
                    {
                        name: 'Microsoft — STRIDE Threat Modeling',
                        url: 'https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats',
                        note: 'The six categories, with concrete examples',
                    },
                ],
            },
            {
                category: 'Authentication & Input',
                items: [
                    {
                        name: 'OWASP Authentication Cheat Sheet',
                        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html',
                        note: 'Practical do/don\'t list for building auth',
                    },
                    {
                        name: 'Zod — TypeScript-first schema validation',
                        url: 'https://zod.dev',
                        note: 'Define once, validate and infer types everywhere',
                    },
                    {
                        name: 'JWT.io',
                        url: 'https://jwt.io',
                        note: 'Decode and inspect JWTs visually while debugging',
                    },
                ],
            },
        ],
    },
    {
        slug: 'openai-postgresql-800-million-users',
        title: 'OpenAI Runs 800 Million Users on a Single PostgreSQL Primary — Here\'s How',
        date: 'July 2026',
        readTime: '11 min read',
        tags: ['PostgreSQL', 'Scaling', 'Databases', 'Systems Design'],
        excerpt: 'OpenAI scaled vanilla PostgreSQL to serve 800M ChatGPT users — millions of queries per second — on one primary and ~50 read replicas. No distributed database underneath. This is a breakdown of the eight engineering decisions that made it possible, and the reasoning behind each.',
        content: [
            {
                type: 'intro',
                text: 'OpenAI published a detailed engineering writeup on how they scaled PostgreSQL to serve 800 million ChatGPT users, handling millions of queries per second, with a single primary instance and roughly 50 read replicas. Most engineers hear "single primary" at that scale and assume there must be a distributed database underneath. There isn\'t. It\'s vanilla PostgreSQL on Azure, scaled through disciplined engineering decisions layered on top of each other. I spent time mapping their architecture — here is what they actually did, and why each choice exists.',
            },
            {
                type: 'heading',
                text: 'The One Decision Everything Flows From',
            },
            {
                type: 'paragraph',
                text: 'The primary only handles writes. Every read that can possibly go to a replica, does. Every technique below is downstream of that single rule — it either protects the primary\'s write path or moves load off it. There is no sharding of the existing workload and no exotic storage engine; it is Postgres doing what Postgres does, with a lot of pressure kept off the one node that matters.',
            },
            {
                type: 'paragraph',
                text: 'The failure mode they are engineering against is a feedback loop: a traffic spike causes cache misses, the misses flood the primary with reads, latency rises, requests start timing out, clients retry, the retries add more load, latency rises further — and the database falls over. Every one of the eight techniques breaks this loop at a different link.',
            },
            {
                type: 'heading',
                text: '1. Offload Reads to Replicas — Aggressively',
            },
            {
                type: 'paragraph',
                text: 'The obvious part is "send reads to replicas." The hard part is the word "can." A read issued inside a write transaction cannot go to a replica — it has to see the transaction\'s own uncommitted writes, so it stays on the primary. The team audited every query in the codebase to find those cases and refactored them out wherever possible, pulling reads out of write transactions so they could be redirected.',
            },
            {
                type: 'heading',
                text: '2. Kill Expensive Queries Before They Become Incidents',
            },
            {
                type: 'paragraph',
                text: 'One query that joined 12 tables was responsible for multiple high-severity outages. The fix was to move complex join logic into the application layer — let PostgreSQL do simple indexed lookups, and let backend code assemble the results. The bigger lesson: ORMs like SQLAlchemy or ActiveRecord are the main source of expensive queries, because they generate SQL you never explicitly wrote and probably never reviewed.',
            },
            {
                type: 'code',
                language: 'python',
                title: 'Move the join out of the database',
                text: `# Before — one ORM call fans out into a 12-table join
convos = (
    session.query(Conversation)
    .options(joinedload(Conversation.messages)
             .joinedload(Message.attachments),
             joinedload(Conversation.user)
             .joinedload(User.org)
             .joinedload(Org.billing_plan))
    .filter(Conversation.user_id == uid)
    .all()
)

# After — a few simple indexed lookups, joined in Python
convos   = repo.conversations_for_user(uid)          # PK/index scan
msg_map  = repo.messages_for(ids(convos))            # IN (...) on an index
user     = cache.get_or_load(f"user:{uid}")          # usually a cache hit
for c in convos:
    c.messages = msg_map.get(c.id, [])`,
            },
            {
                type: 'heading',
                text: '3. PgBouncer — Connection Pooling Worth 10×',
            },
            {
                type: 'paragraph',
                text: 'PostgreSQL has a hard ceiling of about 5,000 connections per instance, and each one carries real backend-process overhead. Without pooling, every application thread holds an open connection and you hit the ceiling fast — "connection storms" are one of OpenAI\'s documented incident patterns. PgBouncer sits in front of the database as a proxy, holds a small stable pool of real connections, and multiplexes thousands of application threads across them. In their benchmarks, connection setup time dropped from 50ms to 5ms.',
            },
            {
                type: 'code',
                language: 'ini',
                title: 'pgbouncer.ini — transaction-level pooling',
                text: `[databases]
chatgpt = host=primary.postgres.internal port=5432 dbname=chatgpt

[pgbouncer]
pool_mode = transaction          ; return the connection after each txn
max_client_conn = 20000          ; app-facing connections
default_pool_size = 40           ; real connections to Postgres per user/db
reserve_pool_size = 10
server_idle_timeout = 60
query_wait_timeout = 5`,
            },
            {
                type: 'heading',
                text: '4. Cache Locking to Survive Cache-Miss Storms',
            },
            {
                type: 'paragraph',
                text: 'Caching is standard; the interesting part is their handling of the cache-miss storm — when a cache node dies and every request suddenly hits PostgreSQL for data that used to be served from memory. Their fix is a single-flight lock: when many requests miss on the same key at once, exactly one acquires a lock and fetches from the database while the rest wait for the cache to be repopulated. Ten thousand simultaneous misses become one query, not ten thousand.',
            },
            {
                type: 'code',
                language: 'python',
                title: 'Single-flight: one fetch, everyone else waits',
                text: `def get_or_load(key, loader, ttl=60):
    val = cache.get(key)
    if val is not None:
        return val

    # Only one caller wins the lock; others poll for the result.
    if cache.set(f"lock:{key}", 1, nx=True, ex=5):
        try:
            val = loader()                 # the single DB hit
            cache.set(key, val, ex=ttl)
            return val
        finally:
            cache.delete(f"lock:{key}")

    for _ in range(50):
        time.sleep(0.05)
        val = cache.get(key)
        if val is not None:
            return val
    return loader()                        # last-resort fallback`,
            },
            {
                type: 'heading',
                text: '5. Workload Isolation — No Noisy Neighbours',
            },
            {
                type: 'paragraph',
                text: 'Different features get different resource budgets. A new experimental feature that fires expensive queries should not be able to degrade ChatGPT\'s core conversation flow. The solution is to split traffic into priority tiers and route each tier to dedicated replica instances. High-priority traffic (the conversation API) and low-priority traffic (background analytics, experiments) never share a PostgreSQL instance, so a bad query in one tier is contained to that tier.',
            },
            {
                type: 'heading',
                text: '6. Cascading Replication — Scaling Past 50 Replicas',
            },
            {
                type: 'paragraph',
                text: 'With direct replication, the primary must stream its write-ahead log (WAL) to every single replica. Around 50 replicas, that fan-out starts to cost the primary real network and CPU — exactly the node you cannot afford to load. Their next evolution, in testing: cascading replication, where a small set of tier-1 replicas receive WAL from the primary and relay it downstream to the rest. The primary streams to a handful of nodes instead of fifty.',
            },
            {
                type: 'heading',
                text: '7. Multi-Layer Rate Limiting',
            },
            {
                type: 'paragraph',
                text: 'Rate limiting lives at four layers: application code, PgBouncer, the proxy, and the query level. When one query pattern spikes, they can block that exact query digest without touching anything else. They also enforce timeouts on idle transactions — a long-running idle transaction holds an old snapshot, which blocks autovacuum (PostgreSQL\'s background cleanup), which causes table bloat over time.',
            },
            {
                type: 'code',
                language: 'sql',
                title: 'Bound idle transactions and slow statements',
                text: `-- Kill transactions left idle mid-flight; they block autovacuum
SET idle_in_transaction_session_timeout = '5s';

-- Cap any single statement
SET statement_timeout = '2s';

-- Surgical control: block one misbehaving query digest,
-- leave everything else untouched (enforced at the proxy layer)
--   digest: a1b2c3...  ->  action: reject`,
            },
            {
                type: 'heading',
                text: '8. Schema Changes Under Strict Constraints',
            },
            {
                type: 'paragraph',
                text: 'Even a small ALTER can trigger a full table rewrite in PostgreSQL, which takes a lock and causes downtime. Their rules: only lightweight alterations that do not rewrite the table, a 5-second hard timeout on any schema change, and new features must go to CosmosDB rather than adding to PostgreSQL. Backfilling a column runs with rate limits and sometimes takes over a week — but it never causes a production incident.',
            },
            {
                type: 'code',
                language: 'sql',
                title: 'Make schema changes non-blocking',
                text: `-- Never wait more than 5s for a lock; never hold one longer
SET lock_timeout = '5s';
SET statement_timeout = '5s';

-- Safe: metadata-only in modern Postgres
ALTER TABLE messages ADD COLUMN model_version text;

-- Unsafe: rewrites and long-locks the whole table
--   ALTER TABLE messages ADD COLUMN seq bigserial;
--   ALTER TABLE messages ALTER COLUMN body TYPE varchar(8000);

-- Backfill in throttled batches, out of band
UPDATE messages SET model_version = 'gpt-4o'
WHERE id BETWEEN :lo AND :hi;   -- small ranges, sleep between`,
            },
            {
                type: 'heading',
                text: 'What I Took Away',
            },
            {
                type: 'list',
                items: [
                    'The right default architecture buys enormous headroom. A read-heavy workload with strong caching, solid pooling, and replica offloading reaches hundreds of millions of users on one primary — if you are disciplined about writes.',
                    'Sharding is a last resort, not a default. OpenAI says sharding the existing workload would touch hundreds of endpoints and take months; they move write-heavy new workloads to CosmosDB instead — a far smaller change.',
                    'The failure modes are operational, not architectural. Their incidents came from cache-miss storms, connection exhaustion, expensive ORM queries, and write spikes on launches — not from hitting a fundamental limit.',
                    'Observability and surgical controls beat raw capacity. Blocking a specific query digest, isolating workloads to dedicated instances, and per-layer rate limits are what let them respond to incidents without rolling back features.',
                    'MVCC is still a real constraint at write scale. Row-versioning overhead makes write-heavy workloads less efficient in Postgres — which is the honest reason new write-heavy tables go to CosmosDB, not because Postgres is bad.',
                ],
            },
            {
                type: 'paragraph',
                text: 'The takeaway that stuck with me: at 800 million users, the interesting engineering was not a clever distributed system. It was a hundred small, disciplined decisions about what the primary is allowed to do — and the observability to enforce them.',
            },
        ],
        resources: [
            {
                category: 'The Source Material',
                items: [
                    {
                        name: 'OpenAI Engineering — Scaling PostgreSQL',
                        url: 'https://openai.com/index/scaling-postgresql/',
                        note: 'The original writeup by Bohan Zhang',
                    },
                    {
                        name: '"The Part of PostgreSQL We Hate the Most"',
                        url: 'https://www.cs.cmu.edu/~pavlo/blog/2023/04/the-part-of-postgresql-we-hate-the-most.html',
                        note: 'Deep dive on MVCC — Bohan Zhang & Andy Pavlo (CMU)',
                    },
                ],
            },
            {
                category: 'Postgres Operations',
                items: [
                    {
                        name: 'PostgreSQL — Cascading Replication',
                        url: 'https://www.postgresql.org/docs/current/warm-standby.html#CASCADING-REPLICATION',
                        note: 'Official docs for the tier-1 relay pattern',
                    },
                    {
                        name: 'Crunchy Data — When Does ALTER TABLE Require a Rewrite?',
                        url: 'https://www.crunchydata.com/blog/when-does-alter-table-require-a-rewrite',
                        note: 'Which schema changes are safe and which lock the table',
                    },
                    {
                        name: 'Azure Database for PostgreSQL — Flexible Server',
                        url: 'https://learn.microsoft.com/en-us/azure/postgresql/overview',
                        note: 'The managed platform OpenAI runs on',
                    },
                ],
            },
        ],
    },
    {
        slug: 'multi-agent-ai-system-synapse',
        title: 'I Built a Multi-Agent AI System — 11 Services, One Newsroom Architecture',
        date: 'June 2026',
        readTime: '16 min read',
        tags: ['Multi-Agent', 'MCP', 'A2A', 'Observability', 'Kubernetes'],
        excerpt: 'A 10-day build called SYNAPSE — eight MCP tool servers and three coordinating agents that collaborate over standardized protocols to generate context-aware article briefs. Covers MCP, agent-to-agent messaging, persistent memory, distributed tracing, self-critique loops, graceful degradation, and the road to Kubernetes.',
        content: [
            {
                type: 'intro',
                text: 'After a few weeks spent fine-tuning a single LLM into a domain expert, a different question started bothering me: what happens when you stop trying to make one model do everything and instead make several specialized agents work together? That turned into a 10-day build I called SYNAPSE — a multi-agent system where eight specialized services and three coordinating agents collaborate over standardized protocols to generate context-aware article briefs on any topic. This is the architectural pattern frontier labs use in production, broken into its parts and built from scratch on a laptop.',
            },
            {
                type: 'heading',
                text: 'Why Multi-Agent?',
            },
            {
                type: 'paragraph',
                text: 'The intuition every AI engineer eventually hits: a single LLM doing everything is brittle. Ask one model to fetch news, parse weather, look up exchange rates, find images, remember past conversations, route between tools, and write a polished article — somewhere in that prompt soup, things break. The fix that production systems converge on is specialization plus coordination. One service does one thing well. The model becomes the connective tissue at the end, weaving outputs together.',
            },
            {
                type: 'paragraph',
                text: 'But "multi-agent" raises its own questions. How do agents discover what tools exist? How do they talk to each other without becoming tightly coupled? How do you debug a system where six things might be running concurrently? How do you measure quality when the answer comes from a pipeline, not a single call? SYNAPSE is my answer to all of those, built one layer at a time.',
            },
            {
                type: 'heading',
                text: 'The Analogy That Unlocked Everything — A Newsroom',
            },
            {
                type: 'paragraph',
                text: 'I tried explaining multi-agent systems to a non-technical friend and failed. Then I tried again with a newsroom. There are reporters who chase stories. There are specialist desks — finance, weather, a photo archive. There is an assignment editor who decides which specialists a story actually needs. There is a copy editor who reviews everything before it goes to print. And there is a message system — a pneumatic tube, a Slack channel — that lets them coordinate without barging into each other\'s offices. Every component in SYNAPSE maps cleanly to a newsroom role, and the analogy stayed useful from Day 2 through Day 10.',
            },
            {
                type: 'list',
                items: [
                    'MCP tool servers → specialist desks (finance, weather, photo archive).',
                    'Contextualist agent → the researcher gathering raw material.',
                    'Scout agent → the editor shaping the story.',
                    'Publisher agent → the writer producing the final draft.',
                    'Router agent → the assignment editor deciding who is needed.',
                    'Critic agent → the copy editor deciding whether it goes to print.',
                    'Memory server → the newsroom\'s archive. Conversation server → the active story file.',
                    'Redis pub/sub → the pneumatic tube system. Phoenix tracing → the call-log book.',
                ],
            },
            {
                type: 'heading',
                text: 'Phase 1 — The Foundation',
            },
            {
                type: 'paragraph',
                text: 'The first version had three MCP tool servers and three agents. MCP — Model Context Protocol — is a standardized way for LLMs to discover and call external tools. Think of it as USB-C for AI: before MCP, every framework reinvented its own tool-calling format. MCP makes a tool server look the same whether it is serving GPT-4, Claude, or a local Llama. I used FastMCP to expose each service over HTTP.',
            },
            {
                type: 'code',
                language: 'python',
                title: 'A minimal MCP tool server with FastMCP',
                text: `from fastmcp import FastMCP
import httpx

mcp = FastMCP("world-data")

@mcp.tool()
async def get_headlines(topic: str, limit: int = 5) -> list[dict]:
    """Fetch recent news headlines for a topic via NewsAPI."""
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://newsapi.org/v2/everything",
            params={"q": topic, "pageSize": limit, "sortBy": "publishedAt"},
            headers={"X-Api-Key": NEWSAPI_KEY},
        )
    return [
        {"title": a["title"], "source": a["source"]["name"], "url": a["url"]}
        for a in r.json().get("articles", [])
    ]

if __name__ == "__main__":
    mcp.run(transport="http", port=8003)`,
            },
            {
                type: 'paragraph',
                text: 'The three initial tool servers: world-data (NewsAPI headlines and OpenWeather conditions), finance-monitor (currency resolution and exchange rates), and media-engine (Pexels image search). The three agents: Contextualist calls the tool servers and aggregates raw signals, Scout decides the story shape based on that data, and Publisher writes the final article via an LLM call.',
            },
            {
                type: 'paragraph',
                text: 'A2A — agent-to-agent communication. The agents do not call each other directly. They drop messages into a shared mailbox, initially a JSON file called post_office.json. Just like a real newsroom — reporters do not barge into the editor\'s office, they leave drafts on the desk. This decouples agents, makes failures recoverable, and scales surprisingly well.',
            },
            {
                type: 'code',
                language: 'python',
                title: 'The A2A mailbox — a three-function API',
                text: `def send_message(to: str, sender: str, payload: dict) -> None:
    """Drop a message on another agent's desk."""
    box = _load()                       # read post_office.json
    box.setdefault(to, []).append(
        {"from": sender, "payload": payload, "ts": time.time()}
    )
    _save(box)

def read_messages(agent: str) -> list[dict]:
    """Pick up everything addressed to this agent."""
    return _load().get(agent, [])

def clear_messages(agent: str) -> None:
    box = _load()
    box[agent] = []
    _save(box)`,
            },
            {
                type: 'paragraph',
                text: 'By the end of Day 2 there was a working pipeline: give it a topic, get a context-aware brief back. But the system was reactive and stateless. Every run started from zero and every flow was hardcoded.',
            },
            {
                type: 'heading',
                text: 'Phase 2 — Making It Smart',
            },
            {
                type: 'paragraph',
                text: 'Three upgrades, one underlying theme: judgment. Day 3 added a memory-server backed by ChromaDB, a local vector database. After every brief is published it is embedded and stored; before every new brief the system retrieves the top-3 most relevant past briefs as additional context. This is the difference between hiring a freelance writer for every article and having a staff reporter on a beat — the freelancer starts cold every time; the staff reporter remembers what they covered last week and builds on it.',
            },
            {
                type: 'paragraph',
                text: 'Day 4 converted the Streamlit UI from "one topic → one brief" into a chat. Each session gets a conversation_id, and follow-up questions read both the new query and the conversation history. If long-term memory is years of past briefs, multi-turn is working memory — what was just said in this conversation. Humans need both; agents do too.',
            },
            {
                type: 'paragraph',
                text: 'Day 5 added the Router agent, sitting above the Scout. Instead of every brief calling every tool server, the Router does an LLM call first to decide which tools actually matter. "Bitcoin\'s price?" routes to only finance-monitor. "Tokyo weather?" routes to only world-data. Before, the newsroom assigned every story to every reporter. The Router is the assignment editor — reads the pitch, decides who is actually needed. Cheaper, faster, less noise.',
            },
            {
                type: 'paragraph',
                text: 'A design decision worth flagging: I deliberately did not route follow-up turns through the memory server. Follow-ups operate on the current conversation\'s data — pulling in semantically related but different past briefs would muddy the LLM\'s context. So memory stays scoped to cross-conversation recall during initial brief generation, and follow-ups stay scoped to this conversation\'s data plus this conversation\'s history. It is invisible to users and very visible in output quality. Architecture is choosing which tradeoffs to take, not avoiding them.',
            },
            {
                type: 'heading',
                text: 'Phase 3 — Making It Trustworthy',
            },
            {
                type: 'paragraph',
                text: 'A smart system you cannot measure or debug is just a black box that occasionally surprises you. Day 6 added distributed tracing with Arize Phoenix. Every agent, every MCP server, every LLM call now emits OpenTelemetry spans. Every brief produces a full waterfall view: which tools fired, what they returned, how long they took, what the LLM was asked, the token counts, and the cost. Going from print() statements to distributed tracing is like going from asking each delivery driver to phone in updates to putting a GPS tracker on every truck.',
            },
            {
                type: 'paragraph',
                text: 'Two architectural choices mattered here. First, Phoenix over Langfuse — Phoenix runs entirely on localhost, no signup, no cloud account. For a portfolio piece on a recruiter\'s laptop, that is the difference between "they cloned it and saw the traces" and "they cloned it and gave up." For production you would swap in Langfuse or Honeycomb; the OpenInference instrumentation stays identical. Second, per-service traces rather than one unified trace — a unified trace would require propagating OpenTelemetry context through MCP boundaries, which FastMCP does not expose cleanly. Per-service traces grouped by service name are less elegant but ship today and are rich enough to debug almost anything.',
            },
            {
                type: 'paragraph',
                text: 'Day 7 built an eval-server that uses LLM-as-judge to score generated briefs against a 20-topic curated dataset. Each brief is graded on factual coverage, structural quality, and hallucination rate; results are persisted as JSON and visualized in a Streamlit eval page. Without evals, "is the model better?" is a vibes-based question. With evals it becomes measurable — and most builders skip this entirely.',
            },
            {
                type: 'paragraph',
                text: 'Day 8 added a critic-server and a draft → critique → revise cycle inside the Publisher. After the first draft, the Critic scores the brief against a rubric. If the score is below threshold, it sends a revision request back to the Publisher with specific feedback, capped at a configurable maximum. This is the reflection pattern from the 2024-25 research wave (Reflexion, Self-Refine) — it improves output quality with minimal architectural complexity.',
            },
            {
                type: 'code',
                language: 'python',
                title: 'The self-critique loop inside the Publisher',
                text: `def publish(brief_request, max_revisions=2, threshold=0.8):
    draft = writer_llm(brief_request)

    for attempt in range(max_revisions):
        review = critic_server.score(draft, rubric=RUBRIC)
        if review["score"] >= threshold:
            break
        draft = writer_llm(
            brief_request,
            previous_draft=draft,
            feedback=review["feedback"],   # specific, actionable
        )

    return draft, review`,
            },
            {
                type: 'heading',
                text: 'Phase 4 — Making It Production-Ready',
            },
            {
                type: 'paragraph',
                text: 'Day 9 added Redis as a shared cache with TTL. External API responses (NewsAPI, OpenWeather, ExchangeRate, Pexels) are cached for short windows, so a single user spamming "regenerate" no longer racks up hundreds of paid API calls. Per-run LLM cost is tracked and displayed in the UI. The cache uses a fail-safe no-op fallback: if Redis is unreachable, the cache becomes a transparent pass-through — no errors, no crashes, the system just runs without caching. That pattern holds for every external dependency in SYNAPSE: degrade gracefully, never fail outright.',
            },
            {
                type: 'paragraph',
                text: 'Day 10 replaced the file mailbox with Redis pub/sub. The original A2A post office was a shared JSON file — beautiful for teaching, terrible for production, because multiple processes polling the same file are fundamentally racy. Each agent now subscribes to its own channel (synapse:mailbox:<agent>) and senders publish to those channels. Same three-function API — send_message, read_messages, clear_messages — so no call-site changes anywhere in the agents.',
            },
            {
                type: 'code',
                language: 'python',
                title: 'Same API surface, Redis pub/sub underneath',
                text: `import redis, json

r = redis.Redis(decode_responses=True)

def send_message(to: str, sender: str, payload: dict) -> None:
    r.publish(f"synapse:mailbox:{to}",
              json.dumps({"from": sender, "payload": payload}))

def read_messages(agent: str) -> list[dict]:
    pubsub = r.pubsub()
    pubsub.subscribe(f"synapse:mailbox:{agent}")
    msgs = []
    while (m := pubsub.get_message(timeout=0.1)):
        if m["type"] == "message":
            msgs.append(json.loads(m["data"]))
    return msgs

# If Redis is unreachable, this module falls back to the
# original JSON-file mailbox automatically — same API, both
# protocol versions coexist, switchable at runtime.`,
            },
            {
                type: 'paragraph',
                text: 'I also built a small dev utility, scripts/watch_mailbox.py, that subscribes to every mailbox channel via Redis PSUBSCRIBE and pretty-prints each A2A message as it arrives. Run it in a side terminal and you can literally watch the Contextualist → Scout handoff happen in real time. It is the closest thing to magic in the whole build.',
            },
            {
                type: 'heading',
                text: 'The Architecture, Top to Bottom',
            },
            {
                type: 'list',
                items: [
                    '8 MCP tool servers — world-data, finance-monitor, media-engine, memory, conversation, router, eval, critic.',
                    '3 agents — Contextualist, Scout, Publisher (with the Router above and the Critic inside Publisher).',
                    '2 storage backends — ChromaDB for semantic memory, Redis for cache and mailbox.',
                    '1 observability stack — Arize Phoenix with OpenInference auto-instrumentation.',
                    '1 UI — Streamlit with a mailbox status badge and an evals dashboard.',
                    'Fail-safe everywhere — Redis cache → no-op fallback; Redis mailbox → file fallback; tool server unavailable → graceful skip.',
                ],
            },
            {
                type: 'heading',
                text: 'What I\'d Do Differently',
            },
            {
                type: 'list',
                items: [
                    'Start with tracing on Day 1. I added Phoenix on Day 6 and spent six days guessing which paths were slow and where cost was leaking. Instrument from the first call.',
                    'The "same API, different backend" pattern is the biggest leverage move. Both the cache and the mailbox use it — ship a teaching-friendly version on day one, graduate to production without rewriting call sites.',
                    'Per-service traces are good enough. Unified OpenTelemetry context propagation through MCP is not worth the engineering at this scale. Save it for when scale forces it.',
                ],
            },
            {
                type: 'heading',
                text: 'What\'s Next — Docker and Kubernetes',
            },
            {
                type: 'paragraph',
                text: 'The final two days are where AI engineering meets infrastructure. Day 11 containerizes every service — one Dockerfile per agent, per MCP server, plus the UI. Eleven containers, composed by a single docker-compose.yml that spins the whole stack up with one command. Day 12 deploys SYNAPSE on Kubernetes: each service becomes its own Deployment plus Service, a ConfigMap holds API keys (a Secret in real production), Redis runs as a StatefulSet, and the Streamlit UI is exposed via an Ingress — the same pattern I used for my earlier Rails-on-Kubernetes project, applied to AI workloads instead of a CRUD app.',
            },
            {
                type: 'code',
                language: 'yaml',
                title: 'critic-server.yaml — one service, the K8s way',
                text: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: critic-server
spec:
  replicas: 2
  selector:
    matchLabels: { app: critic-server }
  template:
    metadata:
      labels: { app: critic-server }
    spec:
      containers:
        - name: critic-server
          image: synapse/critic-server:latest
          ports: [{ containerPort: 8010 }]
          envFrom:
            - configMapRef: { name: synapse-config }
---
apiVersion: v1
kind: Service
metadata:
  name: critic-svc
spec:
  selector: { app: critic-server }
  ports: [{ port: 8010, targetPort: 8010 }]`,
            },
            {
                type: 'paragraph',
                text: 'This is the moment the portfolio coheres: the fine-tuning track, the multi-agent track, and the Kubernetes track converge into one demonstration — build AI systems and run them in production.',
            },
            {
                type: 'heading',
                text: 'The Bigger Point',
            },
            {
                type: 'paragraph',
                text: '"Agentic AI" is not magic. It is mostly good system design. The hard part is not the AI — it is choosing where each LLM call lives, what each service knows, how state flows through the pipeline, how failures degrade, and how you will debug it at 2 AM when something breaks.',
            },
            {
                type: 'paragraph',
                text: 'If you can architect microservices, you can architect agents. Most of the patterns transfer one-to-one — service discovery, message queues, observability, fail-safe defaults, graceful degradation. AI engineering, at this layer, is software engineering with one new tool in the kit.',
            },
            {
                type: 'heading',
                text: 'Key Takeaways',
            },
            {
                type: 'list',
                items: [
                    'Specialization plus coordination beats one model doing everything. One service, one job.',
                    'MCP is USB-C for tools — a standard interface that works across model providers.',
                    'Decouple agents with a shared mailbox. They leave drafts on the desk, they do not barge in.',
                    'Separate cross-conversation memory from within-conversation history. They serve different purposes.',
                    'Instrument on Day 1. Evals turn "is it better?" from a vibe into a number.',
                    'Design every external dependency to degrade gracefully — same API, fallback backend.',
                ],
            },
            {
                type: 'paragraph',
                text: 'The full repo is open source. Clone it, add your API keys, run one script, and the entire stack boots on your laptop — app on port 8501, Phoenix trace dashboard on 6006, and an optional third terminal to watch A2A messages fly between agents in real time.',
            },
            {
                type: 'code',
                language: 'bash',
                title: 'Quickstart',
                text: `git clone https://github.com/Keerthan22-sys/multi-agent-system-a2a-mcp
cd multi-agent-system-a2a-mcp
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt && pip install -e .
cp .env.example .env   # add your API keys

# start Redis, then:
./scripts/start_backends.sh

# in another terminal:
streamlit run ui/app.py`,
            },
        ],
        projects: [
            {
                name: 'multi-agent-system-a2a-mcp',
                link: 'https://github.com/Keerthan22-sys/multi-agent-system-a2a-mcp',
            },
        ],
        resources: [
            {
                category: 'Agent Design Patterns',
                items: [
                    {
                        name: 'Anthropic — Building Effective Agents',
                        url: 'https://www.anthropic.com/research/building-effective-agents',
                        note: 'The reference taxonomy — workflows vs. agents, when to use each',
                    },
                    {
                        name: 'Anthropic — How We Built Our Multi-Agent Research System',
                        url: 'https://www.anthropic.com/engineering/built-multi-agent-research-system',
                        note: 'Orchestrator-worker pattern in production, with the tradeoffs',
                    },
                ],
            },
            {
                category: 'Observability & Evaluation',
                items: [
                    {
                        name: 'Arize Phoenix — Documentation',
                        url: 'https://docs.arize.com/phoenix',
                        note: 'Local-first OpenTelemetry tracing for LLM apps',
                    },
                    {
                        name: 'OpenAI — Agents SDK Tracing',
                        url: 'https://openai.github.io/openai-agents-python/tracing/',
                        note: 'How the built-in trace/span model works',
                    },
                ],
            },
            {
                category: 'Protocols',
                items: [
                    {
                        name: 'Model Context Protocol — Specification',
                        url: 'https://modelcontextprotocol.io/specification',
                        note: 'The standard behind every tool server in this build',
                    },
                    {
                        name: 'FastMCP',
                        url: 'https://github.com/jlowin/fastmcp',
                        note: 'The library used to expose each service over HTTP',
                    },
                ],
            },
        ],
    },
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
