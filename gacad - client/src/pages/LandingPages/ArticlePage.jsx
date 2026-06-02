import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import { fetchArticles } from '../../services/ArticleService';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const { data } = await fetchArticles();
        const allArticles = data.articles || data || [];
        
        // Find article by slug
        const found = allArticles.find(a => 
          a.slug === name || 
          a.title.toLowerCase().replace(/\s+/g, '-') === name
        );

        setArticle(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y border-zinc-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl text-center py-12">
            <div className="mb-6">
              <h2 className="text-6xl font-black text-[#002147]/20 mb-4">?</h2>
              <h1 className="text-4xl font-extrabold text-[#002147] mb-3">Article Not Found</h1>
              <p className="text-lg text-zinc-600 mb-8">The article you're looking for doesn't exist or may have been removed.</p>
            </div>
            <Button to="/articles" variant="primary" className="mt-6">Back to Articles</Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y border-zinc-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#FFD100] bg-[#002147] inline-block px-2.5 py-1 rounded">
            Article
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-[#002147] sm:text-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {article.image && (
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] border-2 border-[#002147] bg-white mb-8 overflow-hidden shadow-md shadow-blue-900/5">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
            <p className="text-base leading-7 text-zinc-600 whitespace-pre-wrap">
              {article.content}
            </p>
          </div>

          <div className="mt-8 border-t border-zinc-200 pt-6">
            <Button to="/articles" variant="primary">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;