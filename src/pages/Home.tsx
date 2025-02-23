import { lazy, Suspense } from "react"

const LazyMoviesList = lazy(() => import('../components/MoviesList'));

const Home = () => {

    return (
        <>
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                    <p>
                        Loading list component...
                    </p>
                </div>
        }>
            <LazyMoviesList />
        </Suspense>
        </>
    )
}

export default Home;