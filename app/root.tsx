import * as React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export type ThemeMode = "light" | "dark";

export type ThemeModeContextType = [
  ThemeMode,
  React.Dispatch<React.SetStateAction<ThemeMode>>
];

const ThemeModeContext = React.createContext<ThemeModeContextType>([
  "light",
  () => {},
]);

ThemeModeContext.displayName = "ThemeModeContext";

const prefersLightMode = `(prefers-color-scheme: light)`;
const getPreferredMode = (): ThemeMode =>
  window.matchMedia(prefersLightMode).matches ? "light" : "dark";

const ThemeModeProvider = ({
  children,
  initialThemeMode,
}: {
  children: React.ReactNode;
  initialThemeMode?: ThemeMode;
}) => {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>(() => {
    if (initialThemeMode) {
      return initialThemeMode;
    }

    if (typeof window !== "object") {
      return "light";
    }
    return initialThemeMode || getPreferredMode();
  });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightMode);
    console.log(mediaQuery);
    const handleChange = () => {
      setThemeMode(mediaQuery.matches ? "light" : "dark");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeModeContext.Provider value={[themeMode, setThemeMode]}>
      {children}
    </ThemeModeContext.Provider>
  );
};

const useThemeMode = () => React.useContext(ThemeModeContext);

export const Navbar = () => {
  const [_, setMode] = useThemeMode();
  return (
    <nav className="flex items-center justify-between border-b-[1px] border-b-orange-200 bg-slate-50 p-4 dark:bg-slate-700 dark:text-white">
      <div className="typo">
        <Link to=".">
          <h4>
            software<strong className="text-xl text-orange-500 ">pato</strong>
            developer
          </h4>
        </Link>
      </div>

      <button
        className="relative box-content h-8 w-8 items-center rounded-full border-[1px] border-slate-700 transition-colors dark:border-slate-100"
        onClick={() => {
          setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
        }}
      >
        <MoonIcon className="absolute top-0 left-0 w-8 stroke-slate-100 p-1 opacity-0 transition-opacity dark:opacity-100" />{" "}
        <SunIcon className="absolute top-0 left-0 w-8 p-1 transition-opacity dark:stroke-slate-700 dark:opacity-0" />
      </button>
    </nav>
  );
};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export const Providers = ({
  children,
}: {
  children?: React.ReactChildren | React.ReactChild;
}) => {
  return (
    <ThemeModeProvider initialThemeMode="light">{children}</ThemeModeProvider>
  );
};

export const AppMarkup = () => {
  const [themeMode] = useThemeMode();
  return (
    <html lang="en" className={`h-full ${themeMode === "dark" ? "dark" : ""}`}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full transition-colors dark:bg-slate-800">
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
export default function AppWithProviders() {
  return (
    <Providers>
      <AppMarkup />
    </Providers>
  );
}
