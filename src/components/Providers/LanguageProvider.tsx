import { ReactNode, useState } from "react";
import { LanguageContext, messagesMap } from "./LanguageContext";

interface LanguageProviderProps {
    children: ReactNode;
}
export const LanguageProvider: React.FC<LanguageProviderProps> =
    ({ children }) => {
        const initialLocale = ['es', 'en', 'ca'].includes(navigator.language.split('-')[0]) 
            ? navigator.language.split('-')[0] 
            : 'en';
        const [locale, setLocale] = useState<string>(initialLocale);
        const changeLanguage = (lang: string) => {
            setLocale(lang);
        };
        return (
            <LanguageContext.Provider
                value={{
                    locale,
                    messages: messagesMap[locale],
                    changeLanguage
                }}>
                {children}
            </LanguageContext.Provider>
        );
    };