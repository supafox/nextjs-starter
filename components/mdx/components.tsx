import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { useMDXComponent } from "next-contentlayer2/hooks";

import { cn } from "@/lib/utils";

import { Copy, Header } from "@/components/ui/text";

type ComponentProps = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const components = {
  h1: ({ className, children, ...props }: ComponentProps) => (
    <Header as="h1" size="48" className={cn(className)} {...props}>
      {children}
    </Header>
  ),
  h2: ({ className, children, ...props }: ComponentProps) => (
    <Header as="h2" size="40" className={cn(className)} {...props}>
      {children}
    </Header>
  ),
  h3: ({ className, children, ...props }: ComponentProps) => (
    <Header as="h3" size="32" className={cn(className)} {...props}>
      {children}
    </Header>
  ),
  h4: ({ className, children, ...props }: ComponentProps) => (
    <Header as="h4" size="24" className={cn(className)} {...props}>
      {children}
    </Header>
  ),
  h5: ({ className, children, ...props }: ComponentProps) => (
    <Header as="h5" size="20" className={cn(className)} {...props}>
      {children}
    </Header>
  ),
  h6: ({ className, children, ...props }: ComponentProps) => (
    <Header as="h6" size="16" className={cn(className)} {...props}>
      {children}
    </Header>
  ),
  a: ({
    className,
    children,
    href,
    ...props
  }: ComponentProps & { href: string }) =>
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ? (
      <a
        href={href}
        className={cn("text-copy-16 underline underline-offset-4", className)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ) : (
      <Link
        href={href}
        className={cn("text-copy-16 underline underline-offset-4", className)}
        {...props}
      >
        {children}
      </Link>
    ),
  p: ({ className, children, ...props }: ComponentProps) => (
    <Copy
      className={cn("text-copy-16 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </Copy>
  ),
  ul: ({ className, ...props }: ComponentProps) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    src,
    width,
    height,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      className={cn("rounded-md border", className)}
      alt={alt || ""}
      src={typeof src === "string" ? src : ""}
      width={width ? parseInt(width.toString()) : 800}
      height={height ? parseInt(height.toString()) : 600}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("border-t even:bg-muted", className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentProps) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentProps) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  Image,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
