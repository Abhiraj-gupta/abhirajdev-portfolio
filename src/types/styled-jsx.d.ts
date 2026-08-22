/**
 * styled-jsx type support for `<style jsx global>{...}</style>`.
 *
 * Container.tsx uses styled-jsx (bundled with Next.js) to toggle body overflow
 * while the mobile menu is open. styled-jsx ships this augmentation itself, but
 * because it is a transitive dependency of `next` rather than a direct one, its
 * types are not always picked up here — which made `tsc` reject the `jsx` and
 * `global` attributes. Declaring them explicitly keeps the type check clean.
 *
 * The properties are declared exactly as styled-jsx declares them, so if its
 * own types do load, interface merging accepts the identical declarations.
 */
import "react";

declare module "react" {
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
