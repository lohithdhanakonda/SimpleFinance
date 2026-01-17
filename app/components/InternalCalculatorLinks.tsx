import Link from "next/link";

type LinkItem = {
  href: string;
  label: string;
};

export default function InternalCalculatorLinks({
  title = "Related Calculators",
  links,
}: {
  title?: string;
  links: LinkItem[];
}) {
  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        {title}
      </h3>

      <ul className="flex flex-wrap gap-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-blue-600 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
