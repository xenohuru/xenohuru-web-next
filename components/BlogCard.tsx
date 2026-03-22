import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogCardProps {
  article: Article;
}

// Placeholder SVG for missing images
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxYTQ3MzE7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlOGEwNDU7c3RvcC1vcGFjaXR5OjAuOCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIENvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==';

export function BlogCard({ article }: BlogCardProps) {
  const imageSrc = article.featured_image || PLACEHOLDER_IMAGE;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${article.slug}`}>
      <article className="group bg-[#111827] rounded-lg overflow-hidden border border-[#c8903a]/10 hover:border-[#c8903a]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#c8903a]/20">
        {/* Featured Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={imageSrc}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#1a4731] text-[#c8903a]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#c8903a] transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#6b7280] mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#6b7280]">
            {article.author_name && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{article.author_name}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(article.published_at)}</span>
            </div>

            {article.read_time && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{article.read_time} min read</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
