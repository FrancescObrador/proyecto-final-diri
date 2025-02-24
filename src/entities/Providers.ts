export interface Providers {
    id:      number;
    results: {
        ES: ProviderResult; // Solo nos interesa el objeto de España
    };
}

export interface ProviderResult {
    link:      string;
    rent?:     Ad[]; // Opcional: array de objetos Ad para rent
    ads?:      Ad[]; // Opcional: array de objetos Ad para ads
    flatrate?: Ad[]; // Opcional: array de objetos Ad para flatrate
}

export interface Ad {
    logo_path:        string;
    provider_id:      number; // Entero, con valor por defecto 0
    provider_name:    string;
    display_priority: number; // Entero, con valor por defecto 0
}