import { createContext, useContext } from "react"

export const mainContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: {},
    setUser: () => {},
    themeMode: false,
    setThemeMode: () => {}
});

export const MainContextProvider = mainContext.Provider;

export default function useMainContext(){
    return useContext(mainContext);
}