import { Outlet } from '@remix-run/react';

const ArticlesLayout = () => {
  return (
    <main className="bg-zinc-200">
      <Outlet />
    </main>
  );
};

export default ArticlesLayout;
