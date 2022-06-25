import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { ArticlesLoaderReturnType } from './articles/index';
import { getArticlesData } from './articles/index';

export async function loader() {
  return json<ArticlesLoaderReturnType>({ articles: await getArticlesData() });
}

export default function Index() {
  const { articles } = useLoaderData<ArticlesLoaderReturnType>();
  return (
    <main className="min-h-screen">
      <div className="relative sm:pb-16 sm:pt-8">
        DEFINITELY A MANIFEST HERE
      </div>
      <div>
        {articles.map((article) => (
          <div key={article.slug}>
            <Link to={`/articles/${article.slug}`}>{article.title}</Link>
            {article.description ? <p>{article.description}</p> : null}
          </div>
        ))}
      </div>
    </main>
  );
}
