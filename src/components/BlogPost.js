import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { HiArrowLeft, HiArrowRight, HiClock, HiCalendar } from 'react-icons/hi';
import blogPosts from '../data/blogPosts';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="blogpage">
                <div className="blogpage-inner">
                    <div className="blogpage-not-found">
                        <h2>Post not found</h2>
                        <p>The blog post you're looking for doesn't exist.</p>
                        <Link to="/#blog" className="btn btn-ghost">
                            <HiArrowLeft /> Back to home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="blogpage">
            <div className="blogpage-inner">
                {/* Back nav */}
                <button
                    onClick={() => navigate('/')}
                    className="blogpage-back"
                >
                    <HiArrowLeft /> Back to home
                </button>

                {/* Article */}
                <article className="blogpage-article">
                    {/* Header */}
                    <header className="blogpage-header">
                        <div className="blog-post-tags">
                            {post.tags.map((tag) => (
                                <span key={tag} className="blog-tag">{tag}</span>
                            ))}
                        </div>
                        <h1 className="blogpage-title">{post.title}</h1>
                        <div className="blog-post-meta">
                            <span className="blog-meta-item">
                                <HiCalendar /> {post.date}
                            </span>
                            <span className="blog-meta-item">
                                <HiClock /> {post.readTime}
                            </span>
                        </div>
                    </header>

                    {/* Body */}
                    <div className="blog-post-body">
                        {post.content.map((block, i) => {
                            switch (block.type) {
                                case 'intro':
                                    return <p key={i} className="blog-intro">{block.text}</p>;
                                case 'heading':
                                    return <h2 key={i} className="blog-heading">{block.text}</h2>;
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

                {/* Bottom back link */}
                <div className="blogpage-bottom">
                    <Link to="/#blog" className="blogpage-back">
                        <HiArrowLeft /> All posts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
