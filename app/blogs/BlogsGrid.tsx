"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Clock3 } from "lucide-react";
import type { BlogPost } from "../content/blog-posts";

const POSTS_PER_PAGE = 3;

export default function BlogsGrid({ posts }: { posts: BlogPost[] }) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <div className="blogs-results-flow">
      <div className="container blogs-featured-grid">
        {visiblePosts.map((post) => (
          <article className="blog-editorial-card" key={post.slug}>
            <a className="blog-editorial-media" href={`/blogs/${post.slug}`} aria-label={`Read ${post.title}`}>
              <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 45vw, 380px" />
            </a>
            <div className="blog-editorial-body">
              <div className="blog-editorial-meta"><span>{post.category}</span><small><Clock3 aria-hidden="true" /> {post.readTime}</small></div>
              <h3><a href={`/blogs/${post.slug}`}>{post.title}</a></h3>
              <p>{post.summary}</p>
              <a className="blog-editorial-link" href={`/blogs/${post.slug}`}>Read more <ArrowRight aria-hidden="true" size={16} /></a>
            </div>
          </article>
        ))}
      </div>
      {hasMore ? (
        <div className="container blogs-more">
          <button className="button button-outline" type="button" onClick={() => setVisibleCount((count) => Math.min(count + POSTS_PER_PAGE, posts.length))}>
            See more insights <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
