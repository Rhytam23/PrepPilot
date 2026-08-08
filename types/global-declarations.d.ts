// Global declarations fallback for environments without locally installed typings
import * as React from "react"

declare module "react" {
  const React: any;
  export default React;
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useMemo: any;
  export const createContext: any;
  export const useContext: any;
  export type ReactNode = any;
  export type FormEvent = any;
  export type KeyboardEvent<T = any> = any;
  export type ChangeEvent<T = any> = any;
  export type Key = any;
}

declare module "react-dom" {
  const ReactDOM: any;
  export default ReactDOM;
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module "next/server" {
  export const NextResponse: any;
}

declare module "next/navigation" {
  export const useRouter: any;
  export const useSearchParams: any;
}

declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "framer-motion" {
  export const motion: any;
  export const AnimatePresence: any;
}

declare module "lucide-react" {
  export const ArrowRight: any;
  export const ArrowLeft: any;
  export const Bot: any;
  export const ChevronRight: any;
  export const ChevronLeft: any;
  export const ChevronUp: any;
  export const ChevronDown: any;
  export const Mic2: any;
  export const Send: any;
  export const Sparkles: any;
  export const UserRound: any;
  export const Loader2: any;
  export const AlertCircle: any;
  export const RefreshCw: any;
  export const Award: any;
  export const BookOpen: any;
  export const CheckCircle2: any;
}

declare module "class-variance-authority" {
  export const cva: any;
}

declare module "tailwind-merge" {
  export const twMerge: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
