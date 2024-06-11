import { createContext } from 'react';
import { IThemeContext, ThemeVariant } from '../types/App';

const ThemeContext = createContext<IThemeContext>({
    variant: ThemeVariant.Light
});

export default ThemeContext;