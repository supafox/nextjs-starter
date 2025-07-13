import { cn } from "@/lib/utils";

import { Stack } from "@/components/ui/stack";
import { Copy, Header } from "@/components/ui/text";

interface MdxHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
}

export function MdxHeader({
  heading,
  text,
  className,
  ...props
}: MdxHeaderProps) {
  return (
    <>
      <Stack className={cn("space-y-4", className)} {...props}>
        <Header as="h1" size="48">
          {heading}
        </Header>
        {text && <Copy>{text}</Copy>}
      </Stack>
    </>
  );
}
