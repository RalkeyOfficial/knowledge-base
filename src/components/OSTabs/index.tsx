import React, {type ReactNode, type ComponentProps} from 'react';
import Tabs from '@theme/Tabs';

/**
 * Thin wrapper around Docusaurus <Tabs> that pins `groupId="os"`, so every
 * OS switcher across the site stays in sync and remembers the reader's choice
 * (Linux / macOS / Windows).
 *
 * Usage in MDX:
 *
 *   import OSTabs from '@site/src/components/OSTabs';
 *   import TabItem from '@theme/TabItem';
 *
 *   <OSTabs>
 *     <TabItem value="linux" label="Linux"> ... </TabItem>
 *     <TabItem value="macos" label="macOS"> ... </TabItem>
 *     <TabItem value="windows" label="Windows"> ... </TabItem>
 *   </OSTabs>
 *
 * Keep the values `linux` / `macos` / `windows` consistent — that's what the
 * sync key matches on.
 */
export default function OSTabs(
  props: ComponentProps<typeof Tabs>,
): ReactNode {
  return <Tabs groupId="os" {...props} />;
}
