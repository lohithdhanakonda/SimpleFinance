import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-xs text-gray-600 mb-4"
    >
      <ol className="flex flex-wrap gap-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:underline text-blue-600"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800 font-medium">
                {item.label}
              </span>
            )}

            {index < items.length - 1 && <span>›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
