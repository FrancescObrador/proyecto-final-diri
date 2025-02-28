export interface Providers {
    id:      number;
    results: {
        ES: ProviderResult; 
    };
}

export interface ProviderResult {
    link:      string;
    rent?:     Ad[]; 
    ads?:      Ad[]; 
    flatrate?: Ad[]; 
}

export interface Ad {
    logo_path:        string;
    provider_id:      number; 
    provider_name:    string;
    display_priority: number; 
}