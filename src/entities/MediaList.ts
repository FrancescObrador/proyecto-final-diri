import { Media } from "./Media";

export interface MovieList {
    page:          number;
    results:       Media[];
    total_pages:   number;
    total_results: number;
}