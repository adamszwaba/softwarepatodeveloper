import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import Providers from './providers';

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => {
  return render(<Providers>{ui}</Providers>, options);
};
