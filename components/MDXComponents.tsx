import type { ComponentProps } from "react";

export const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => <h1 className="mdx-h1" {...props} />,
  h2: (props: ComponentProps<"h2">) => <h2 className="mdx-h2" {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 className="mdx-h3" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="mdx-p" {...props} />,
  a: (props: ComponentProps<"a">) => (
    <a className="link" target="_blank" rel="noreferrer" {...props} />
  ),
  code: (props: ComponentProps<"code">) => <code className="inline-code" {...props} />,
  pre: (props: ComponentProps<"pre">) => <pre className="code-block" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="mdx-ul" {...props} />,
  ol: (props: ComponentProps<"ol">) => <ol className="mdx-ol" {...props} />,
  li: (props: ComponentProps<"li">) => <li className="mdx-li" {...props} />,
};


