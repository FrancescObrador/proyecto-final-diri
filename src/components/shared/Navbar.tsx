import { ThemeController } from './ThemeController'

export const Navbar = () => {
  return (
    <div className="fixed navbar bg-base-200 text-base-content z-50">

      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">PeliPlan</a>
      </div>

      <div className="navbar-center">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-auto md:w-128" />
        </div>
      </div>

      <div className="navbar-end">
        <ThemeController />
      </div>

    </div>
  )
}
