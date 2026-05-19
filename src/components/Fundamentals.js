import { FaGithub } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const items = [
    {
        num: '01',
        name: 'micrograd',
        author: 'Karpathy / kg fork',
        desc: 'A scalar-valued autograd engine — backpropagation from scratch. Understanding how gradients actually flow before touching PyTorch.',
        link: 'https://github.com/Keerthan22-sys/micrograd',
    },
    {
        num: '02',
        name: 'minbpe',
        author: 'Karpathy / kg fork',
        desc: 'Minimal, clean implementation of Byte Pair Encoding — the tokenization algorithm inside GPT-4. Most devs skip this. I didn\'t.',
        link: 'https://github.com/Keerthan22-sys/minbpe',
    },
    {
        num: '03',
        name: 'nanoGPT',
        author: 'Karpathy / kg fork',
        desc: 'Training and fine-tuning medium-sized GPTs from scratch. Character-level to sub-word — understanding attention, residual streams, and KV caching.',
        link: 'https://github.com/Keerthan22-sys/nanoGPT',
    },
    {
        num: '04',
        name: 'kilo-agent',
        author: 'Original build',
        desc: 'Custom AI agent built from scratch — not wrapped around LangChain. Bare-metal tool-calling, memory, and planning loop to understand what frameworks are actually doing.',
        link: 'https://github.com/Keerthan22-sys/kilo-agent',
    },
];

const Fundamentals = () => {
    return (
        <section id="fundamentals" className="section">
            <div className="section-inner">
                <div className="section-eyebrow">First Principles</div>
                <h2 className="section-title">Under the hood</h2>

                <p className="fundamentals-intro">
                    Most engineers use AI as a black box. I don't. Before reaching for a
                    framework, I implement the underlying concept from scratch —
                    <strong> autograd, tokenization, attention, agent loops</strong>.
                    This is what lets me debug, optimise, and push beyond what the
                    tutorial shows.
                </p>

                <div className="fundamentals-grid">
                    {items.map((item) => (
                        <div key={item.num} className="fundamental-card">
                            <div className="fc-number">{item.num}</div>
                            <div>
                                <div className="fc-name">{item.name}</div>
                                <p className="fc-desc">{item.desc}</p>
                                <div className="fc-tag">
                                    <FaGithub style={{ fontSize: '1.2rem', color: 'var(--text-3)' }} />
                                    {item.author}
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            marginLeft: 'auto',
                                            color: 'var(--accent-light)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            fontSize: '1.15rem',
                                            transition: 'gap 0.15s',
                                        }}
                                    >
                                        View <HiArrowRight />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Fundamentals;
