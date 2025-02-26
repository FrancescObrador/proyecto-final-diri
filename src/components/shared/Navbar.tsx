import { LanguageSelector } from './LanguageSelector'
import SearchBar from './SearchBar'
import { ThemeController } from './ThemeController'

export const Navbar = () => {
  return (
    <div className="fixed navbar bg-base-200 text-base-content z-50">

      <div className="navbar-start">

        <a className="btn btn-ghost text-xl hidden sm:flex space-x-1">
          <img className='size-8' src='images/logo.svg'/>
          <h1 className='hidden md:inline'>MovyFlick</h1>
          </a>
      </div>

      <div className="navbar-center">
        <SearchBar />
      </div>

      <div className="navbar-end">
        <ThemeController />
        <LanguageSelector />
      </div>

    </div>
  )
}
