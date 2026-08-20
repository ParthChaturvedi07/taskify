export function cn(...classes: (string | undefined | null | false | Record<string, boolean>)[]) {
  return classes
    .map(cls => {
      if (!cls) return "";
      if (typeof cls === "string") return cls;
      return Object.entries(cls)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(" ");
    })
    .filter(Boolean)
    .join(" ");
}
