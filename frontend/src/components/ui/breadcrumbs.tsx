export function Breadcrumbs({ items }: {items: string[];}) {
  return (
    <nav className="text-sm text-[var(--color-text-secondary)]">
      {items.map((item, i) =>
      <span key={i}>
          {item}
          {i < items.length - 1 ? " / " : ""}
        </span>
      )}
    </nav>);

}