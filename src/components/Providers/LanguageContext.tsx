import { createContext } from 'react';
import esMessages from '../../data/es.json';
import enMessages from '../../data/en.json';
import caMessages from '../../data/ca.json'

interface LanguageContextProps {
    locale: string;
    messages: Record<string, string>;
    changeLanguage: (lang: string) => void;
}

export const messagesMap: { [key: string]: Record<string, string> } = {
    en: enMessages,
    es: esMessages,
    ca: caMessages,
};

export const LanguageContext =
    createContext<LanguageContextProps>({
        locale: 'en',
        messages: enMessages,
        changeLanguage: () => { },
    });