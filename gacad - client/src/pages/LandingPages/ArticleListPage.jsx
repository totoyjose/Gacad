import { useState, useEffect } from 'react';
import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        // Only show published articles on public page
        const published = (data.articles || data || []).filter(a => a.status === 'published');
        
        // Map to the format that ArticleList component expects
        const mappedArticles = published.map(article => ({
          name: article.slug || article.title.toLowerCase().replace(/\s+/g, '-'),
          title: article.title,
          image: article.image || '/placeholder.jpg',   // you can add a real placeholder image later
          content: [article.content.substring(0, 180) + '...']  // short preview
        }));

        setArticles(mappedArticles);
      } catch (err) {
        console.error("Failed to load articles", err);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading articles...</div>;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Header Section */}
      <section className="border-y border-zinc-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#FFD100] bg-[#002147] inline-block px-2.5 py-1 rounded">
          Articles
        </p>

        <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-[#002147] sm:text-4xl">
          Discover the AGAP company
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          A family of companies dedicated to providing innovative solutions in the field of education, technology, and consulting. Explore our latest insights and stories.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* Article Grid Container Section */}
      <section className="border-y border-zinc-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#002147]">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#002147]">
            Article card grid
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;