import { ReactNode } from 'react';

export default function LayoutMain({ children }: { children: ReactNode }) {
  return (
    <main>{children}</main>
  );
}