/// <reference types="vite/client" />

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

interface Window {
  gtag?: (
    command: 'event' | 'config' | 'js',
    eventNameOrId: string | Date,
    params?: Record<string, unknown>
  ) => void;
}
