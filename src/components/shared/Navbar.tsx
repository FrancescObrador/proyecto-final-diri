import { ThemeController } from './ThemeController'

export const Navbar = () => {
  return (
    <div className="fixed navbar bg-base-200 text-base-content z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">PeliPlan</a>
      </div>
      <div className="flex flex-row gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <ThemeController />
      </div>
    </div>
  )
}
