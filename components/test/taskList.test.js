import TaskList from '../TaskList';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('This component show task as a list', () => {
  it('show task list', () => {
      const tasks = render(<TaskList tasks={[{}]} />);
      expect(tasks).toMatchSnapshot();
  })
})