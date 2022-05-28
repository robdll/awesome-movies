import { render, screen } from '@testing-library/react';
import ResultsTable from './ResultsTable';

test('renders learn react link', () => {
  render(<ResultsTable />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
