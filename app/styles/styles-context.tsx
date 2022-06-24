import { createContext } from "react";

export interface ServerStyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}

/**
 * Provides context for css files for ssr env
 *
 * Directly copied from
 * https://chakra-ui.com/getting-started/remix-guide#2-provider-setup
 */
export const ServerStyleContext = createContext<
  ServerStyleContextData[] | null
>(null);

export interface ClientStyleContextData {
  reset: () => void;
}

/**
 * Provides context for css files for clientside env
 *
 * Directly copied from
 * https://chakra-ui.com/getting-started/remix-guide#2-provider-setup
 */
export const ClientStyleContext = createContext<ClientStyleContextData | null>(
  null
);
