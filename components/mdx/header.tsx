import { cn } from "@/lib/utils";

import { Stack } from "@/components/ui/stack";
import { Copy, Header } from "@/components/ui/text";

interface MdxHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
}

/**
 * Renders a header section with a main heading and optional descriptive text.
 *
 * Displays the heading as a prominent title and, if provided, shows additional text below it.
 *
 * @param heading - The main header text to display
 * @param text - Optional descriptive text shown below the heading
 */
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
