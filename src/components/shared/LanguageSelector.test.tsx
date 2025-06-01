// import { render, screen, fireEvent } from '@testing-library/react'
// import { LanguageSelector } from './LanguageSelector'
// import { LanguageProvider } from '../Providers/LanguageProvider'

// describe('LanguageSelector', () => {
//   it('renders language selector button', () => {
//     render(
//       <LanguageProvider>
//         <LanguageSelector />
//       </LanguageProvider>
//     )
    
//     expect(screen.getByRole('button')).toBeInTheDocument()
//   })

//   it('opens dropdown with language options when clicked', async () => {
//     render(
//       <LanguageProvider>
//         <LanguageSelector />
//       </LanguageProvider>
//     )
    
//     const button = screen.getByRole('button')
//     fireEvent.click(button)
    
//     expect(screen.getByText('English')).toBeInTheDocument()
//     expect(screen.getByText('Español')).toBeInTheDocument()
//     expect(screen.getByText('Català')).toBeInTheDocument()
//   })
// })