'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Share2, Calendar, User, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: article, isLoading, error, refetch } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => api.blog.detail(slug),
  });

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSkeleton variant="page" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#0d1117] pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">Article not found</h2>
            <button
              onClick={() => refetch()}
              className="bg-[#1a7a4a] text-white px-6 py-3 rounded-lg hover:bg-[#1a7a4a]/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Featured Image */}
      {article.featuredImage && (
        <div className="relative w-full h-[60vh] pt-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.featuredImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[#0d1117]" />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-[#8b949e] mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{calculateReadTime(article.content)} min read</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#161b22] text-[#1a7a4a] text-sm rounded-full border border-[#1a7a4a]/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] text-[#e6edf3] rounded-lg border border-[#30363d] hover:border-[#1a7a4a] transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share Article
          </button>
        </header>

        {/* Excerpt */}
        {article.excerpt && (
          <div className="mb-10 p-6 bg-[#161b22] border-l-4 border-[#1a7a4a] rounded-lg">
            <p className="text-lg text-[#e6edf3] leading-relaxed italic">
              {article.excerpt}
            </p>
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:text-white
            prose-p:text-[#e6edf3] prose-p:leading-relaxed
            prose-a:text-[#1a7a4a] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-img:rounded-lg prose-img:shadow-lg
            prose-code:bg-[#161b22] prose-code:text-[#e8a045] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-[#30363d]
            prose-blockquote:border-l-[#1a7a4a] prose-blockquote:text-[#8b949e]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Author Bio (if available) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#161b22] rounded-2xl p-6 border border-[#30363d]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1a7a4a] flex items-center justify-center text-white text-2xl font-bold">
              {article.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{article.author}</h3>
              <p className="text-[#8b949e]">Contributing Writer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
