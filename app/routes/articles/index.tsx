import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import type * as MDX from "*.mdx";

import * as article1 from "./article1.mdx";

export type ArticleData = {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type ArticlesLoaderReturnType = {
  articles: Awaited<ArticleData[]>;
};

export function extractDataFromModule(articleImport: typeof MDX): ArticleData {
  return {
    slug: articleImport.filename.replace(/\.mdx$/, ""),
    ...articleImport.attributes.meta,
  };
}

export async function getArticlesData() {
  return [article1].map(extractDataFromModule);
}

export async function loader() {
  // Return metadata about each of the posts for display on the index page.
  // Referencing the posts here instead of in the Index component down below
  // lets us avoid bundling the actual posts themselves in the bundle for the
  // index page.
  return json<ArticlesLoaderReturnType>({
    articles: await getArticlesData(),
  });
}

export default function Index() {
  const { articles } = useLoaderData<ArticlesLoaderReturnType>();
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.slug}>
          <Link to={article.slug}>{article.title}</Link>
          {article.description ? <p>{article.description}</p> : null}
        </li>
      ))}
    </ul>
  );
}
