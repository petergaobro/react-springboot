import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MessageBoard from './components/MessageBoard';
import SingleMessage from './components/SingleMessage';

// Mock the components
jest.mock('./components/MessageBoard', () => () => <div>MessageBoard Component</div>);
jest.mock('./components/SingleMessage', () => () => <div>SingleMessage Component</div>);

/** test messageBoard component */
test('renders MessageBoard component for the root route', () => {
  render(
    /** simulate the routing environment */
    <MemoryRouter initialEntries={['/']}>
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<MessageBoard />} />
      </Routes>
    </MemoryRouter>
  );
  /** assuming the messageBoard could render */
  expect(screen.getByText('MessageBoard Component')).toBeInTheDocument();
});

/** test singleMessage component */
test('renders SingleMessage component for the /message/:id route', () => {
  render(
    /** simulate the routing environment */
    <MemoryRouter initialEntries={['/message/1']}>
      {/* <App /> */}
      <Routes>
        <Route path="/message/:id" element={<SingleMessage />} />
      </Routes>
    </MemoryRouter>
  );
  /** assuming the single message component renders specific texts with id 1 */
  expect(screen.getByText('SingleMessage Component')).toBeInTheDocument();
});
