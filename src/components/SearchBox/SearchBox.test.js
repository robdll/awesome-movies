import { render, screen } from '@testing-library/react';
import SearchBox from './SearchBox';

test('renders learn react link', () => {
  render(<SearchBox />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
