/// <reference types="vite/client" />

interface ImportMetaEnv {
  /*
  the variable is optional, so TypeScript types it as string | undefined
  so if the key is missing need to be handled
  */
  readonly VITE_RESTCOUNTRIES_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}