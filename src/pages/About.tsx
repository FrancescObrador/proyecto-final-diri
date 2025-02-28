import { Link } from "react-router-dom"

const About = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">About This Project</h1>
      <div className="prose max-w-none">
      <p className="mb-4">
        This project is a bla bla bla project</p>
      <p className="mb-4">
        Built with React and TypeScript.
      </p>
      <div className="mt-6">
        <Link to="/" className="link link-primary">
        ← Back to Home
        </Link>
      </div>
      </div>
    </>
  )
}

export default About;