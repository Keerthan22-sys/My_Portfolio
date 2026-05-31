import { Link } from 'react-router-dom';
import { HiArrowRight, HiClock, HiCalendar } from 'react-icons/hi';
import blogPosts from '../data/blogPosts';

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

                <div className="blog-preview-grid">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className="blog-preview-card"
                        >
                            <div className="blog-preview-tags">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="blog-tag">{tag}</span>
                                ))}
                            </div>
                            <h3 className="blog-preview-title">{post.title}</h3>
                            <p className="blog-preview-excerpt">{post.excerpt}</p>
                            <div className="blog-preview-footer">
                                <div className="blog-preview-meta">
                                    <span className="blog-meta-item">
                                        <HiCalendar /> {post.date}
                                    </span>
                                    <span className="blog-meta-item">
                                        <HiClock /> {post.readTime}
                                    </span>
                                </div>
                                <span className="blog-preview-read">
                                    Read article <HiArrowRight />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
