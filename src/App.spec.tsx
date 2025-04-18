import {render, screen} from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('renders', () => {
    render(<App />)
    const component = screen.getByTestId('main-div');
    expect(component).toBeInTheDocument();
  })
})