import { testEnvironment } from '../../jest.config.cjs';
import NavBar from './NavBar';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar', () => {
    const renderNavBar = () => render(<NavBar />, { wrapper: MemoryRouter });
    test('renders NavBar', () => {
        renderNavBar();
        //testing links
        expect(screen.getByText("Posts List")).toBeInTheDocument();
        expect(screen.getByText("New Post")).toBeInTheDocument();
    });
});