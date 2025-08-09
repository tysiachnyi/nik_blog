export function truncateWords(str: string, n: number) {
  const words = str.trim().split(/\s+/);
  return words.length <= n ? str : words.slice(0, n).join(" ") + "…";
}
