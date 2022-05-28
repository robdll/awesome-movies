import { render, screen } from '@testing-library/react';
import Tabs from './Tabs';

test('renders learn react link', () => {
  render(<Tabs />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
