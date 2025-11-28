import { twMerge } from "tailwind-merge";

export function cn(...values: Array<string | undefined | null | false>) {
  return twMerge(values.filter(Boolean).join(" "));
}
