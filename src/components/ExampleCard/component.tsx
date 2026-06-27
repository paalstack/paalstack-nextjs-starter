'use client';

/**
 * ExampleCard — a reusable card demonstrating the component pattern using
 * @paalstack/react-ui Card primitives.
 *
 * Pattern:
 * - component.tsx  → implementation
 * - index.ts       → barrel export (re-exports from component.tsx)
 *
 * Replace this component with your own shared UI components.
 */

import { Card } from '@paalstack/react-ui';
import { type FC, type ReactNode } from 'react';

export type ExampleCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  /** Optional `data-qa` attribute for test selection */
  'data-qa'?: string;
};

const ExampleCard: FC<ExampleCardProps> = ({ title, description, children, 'data-qa': dataQa }) => {
  return (
    <Card
      data-qa={dataQa}
      className="transition-shadow hover:shadow-md"
      header={{ title, description }}
    >
      {children}
    </Card>
  );
};

export { ExampleCard };
