import { lazy, Suspense } from 'react'
import { LanguageSelector } from './LanguageSelector'
import ThemeController from './ThemeController';

const LazySearchBar = lazy(() => import('./SearchBar'));

const Navbar = () => {
  return (
    <div className="fixed navbar bg-base-200 text-base-content z-50">

      <div className="navbar-start">

        <a className="btn btn-ghost text-xl hidden sm:flex space-x-1">
          <img className='size-8' src='images/logo.svg' />
          <h1 className='hidden md:inline'>MovyFlick</h1>
        </a>
      </div>

      <div className="navbar-center">
        <Suspense fallback={
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-auto md:w-128"
            />
          </div>
        }>
          <LazySearchBar />
        </Suspense>
      </div>

      <div className="navbar-end">
        <ThemeController />
        <LanguageSelector />
      </div>

    </div>
  )
}

export default Navbar;