import type { JSX, ReactNode } from "react";

interface ExternalLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string | undefined;
}

export function ExternalLink({
  href,
  children,
  className,
}: ExternalLinkProps): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <span className="sr-only"> (відкриється в новій вкладці)</span>
    </a>
  );
}
