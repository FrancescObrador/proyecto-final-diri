import { LanguageSelector } from './LanguageSelector'
import SearchBar, { SearchResult } from './SearchBar'
import { ThemeController } from './ThemeController'

export const Navbar = () => {
  return (
    <div className="fixed navbar bg-base-200 text-base-content z-50">

      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">PeliPlan</a>
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
