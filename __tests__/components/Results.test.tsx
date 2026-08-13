import { render, screen } from '@testing-library/react';
import Results from '@/components/Results';
import { type ResultsProps } from '@/types/poll';

const results: ResultsProps = {
  percentages: [
    { id: 'option-1', name: 'Thor', percentage: 43 },
    { id: 'option-2', name: 'Loki', percentage: 57 },
  ],
  winningOptionIds: ['option-2'],
};

describe('Results', () => {

  it('renders the correct percentage text for each option', () => {
    render(
      <Results {...results} />
    );

    expect(screen.getByText('43%')).toBeInTheDocument();
    expect(screen.getByText('57%')).toBeInTheDocument();
  });

  it("marks the winning option's meter with the correct percentage and show a super hero icon next to it", () => {
    render(
      <Results {...results} />
    );
    expect(screen.getByText('57%')).toBeInTheDocument();
    expect(screen.getByText(/Loki/)).toHaveTextContent('🦸');

  });

  it('shows a super hero icon next to every tied leading option', () => {
    render(
      <Results
        percentages={[
          { id: 'option-7', name: 'Tom Holland', percentage: 45 },
          { id: 'option-8', name: 'Tobey Maguire', percentage: 45 },
          { id: 'option-9', name: 'Andrew Garfield', percentage: 10 },
        ]}
        winningOptionIds={['option-7', 'option-8']}
      />
    );

    expect(screen.getByText(/Tom Holland/)).toHaveTextContent('🦸');
    expect(screen.getByText(/Tobey Maguire/)).toHaveTextContent('🦸');
    expect(screen.getByText(/Andrew Garfield/)).not.toHaveTextContent('🦸');
  });

  it('does not show a super hero icon for any option when there is no winner', () => {
    render(
      <Results
        percentages={[
          { id: 'option-1', name: 'Thor', percentage: 0 },
          { id: 'option-2', name: 'Loki', percentage: 0 },
        ]}
        winningOptionIds={[]}
      />
    );

    expect(screen.queryByText('🦸')).not.toBeInTheDocument();
  });

  it('renders one list item per option', () => {
    render(
      <Results {...results} />
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});