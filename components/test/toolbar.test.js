import Toolbar from '../toolbar';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('This component show task as a list', () => {
  it('show task list', () => {
      const toolbar = render(<Toolbar />);
      expect(toolbar).toMatchSnapshot();
  })
})