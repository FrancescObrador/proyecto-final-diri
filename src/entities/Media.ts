export interface Media {
    // Propiedades comunes base
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;

    // Propiedades exclusivas de TV
    original_name?: string;        // TV
    name?: string;                 // TV
    first_air_date?: string;      // TV (tipo string)
    
    // Propiedades exclusivas de Movie
    original_title?: string;      // Movie
    title?: string;               // Movie
    release_date?: Date;          // Movie (tipo Date)
    video?: boolean;              // Movie
    
    // Propiedades con solapamiento (TV las tiene, Movie son opcionales)
    genre_ids?: number[];         // Presente en TV y Movie (opcional en Movie)
    origin_country?: string[];    // Obligatorio en TV, opcional en Movie
    media_type?: string;
    
    // Propiedades exclusivas de Movie (detalles)
    belongs_to_collection?: BelongsToCollection;
    budget?: number;
    genres?: Genre[];
    homepage?: string;
    imdb_id?: string;
    production_companies?: ProductionCompany[];
    production_countries?: ProductionCountry[];
    revenue?: number;
    runtime?: number;
    spoken_languages?: SpokenLanguage[];
    status?: string;
    tagline?: string;
}

export interface Result {
    page:          number;
    results:       TV[];
    total_pages:   number;
    total_results: number;
}

export interface TV {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    origin_country:    string[];
    original_language: string;
    original_name:     string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    first_air_date:    string;
    name:              string;
    vote_average:      number;
    vote_count:        number;
}


export interface BelongsToCollection {
    id:            number;
    name:          string;
    poster_path:   null;
    backdrop_path: null;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface ProductionCompany {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}
