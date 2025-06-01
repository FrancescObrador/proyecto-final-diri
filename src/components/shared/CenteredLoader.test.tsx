// import { render, screen } from '@testing-library/react'
// import CenteredLoader from './CenteredLoader'

// describe('CenteredLoader', () => {
//   it('renders loading spinner and messages', () => {
//     const testMessages = ['Loading message 1', 'Loading message 2']
//     render(<CenteredLoader messages={testMessages} />)
    
//     // Verifica que el spinner está presente
//     expect(screen.getByRole('status')).toBeInTheDocument()
    
//     // Verifica que el primer mensaje está visible inicialmente
//     expect(screen.getByText(testMessages[0])).toBeInTheDocument()
//     expect(screen.queryByText(testMessages[1])).not.toBeInTheDocument()
//   })

//   it('changes messages after interval', () => {
//     jest.useFakeTimers()
//     const testMessages = ['Message 1', 'Message 2']
//     render(<CenteredLoader messages={testMessages} intervalTime={1000} />)
    
//     // Avanza el tiempo
//     jest.advanceTimersByTime(1000)
    
//     // Verifica que el mensaje ha cambiado
//     expect(screen.getByText(testMessages[1])).toBeInTheDocument()
//     expect(screen.queryByText(testMessages[0])).not.toBeInTheDocument()
    
//     jest.useRealTimers()
//   })
// })