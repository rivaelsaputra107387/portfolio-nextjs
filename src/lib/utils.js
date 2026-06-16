/**
 * Simple classname merge utility (replaces shadcn's cn).
 * Filters out falsy values and joins remaining class strings.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
