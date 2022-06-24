import createCache from "@emotion/cache";

/**
 * Creates emotion cache to prevent styles loss on ssr content
 *
 * see https://chakra-ui.com/getting-started/remix-guide#2-provider-setup
 * for detailed explanation
 */
export default function createEmotionCache() {
  return createCache({ key: "css" });
}
