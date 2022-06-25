import { fireEvent, screen } from '@testing-library/react';
import { Navbar } from './navbar';
import { renderWithProviders } from '@utils/test-utils';
import { useBreakpointValue } from '@chakra-ui/media-query';
import type { MockedFunction } from 'vitest';

vi.mock('@chakra-ui/media-query', async () => {
  const mod = await vi.importActual<typeof import('@chakra-ui/media-query')>(
    '@chakra-ui/media-query',
  );
  return {
    ...mod,
    useBreakpointValue: vi.fn(),
  };
});

const useBreakpointValueMock = useBreakpointValue as MockedFunction<
  typeof useBreakpointValue
>;

describe('navbar by default', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should display the name of the blog', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('softwarepatodeveloper')).toBeInTheDocument();
  });
  it('should display a menu button by default', () => {
    renderWithProviders(<Navbar />);

    const menuButton = screen.getByRole('button', { name: 'menu' });

    fireEvent.click(menuButton);

    expect(screen.getByRole('link', { name: 'about us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'artciles' })).toBeInTheDocument();
  });

  it('should display links on breakpoints bigger than md', () => {
    renderWithProviders(<Navbar />);
    useBreakpointValueMock.mockReturnValue(true);

    expect(screen.getByRole('link', { name: 'about us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'artciles' })).toBeInTheDocument();
  });
});
