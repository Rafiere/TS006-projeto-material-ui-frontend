import { Box } from "@mui/material";
import { createContext, useCallback, useContext, useState } from "react";

interface IDrawerContextData {

    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}

interface IDrawerContextProps {

    children: React.ReactNode
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {

    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC<IDrawerContextProps> = ({ children }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false); //O Drawer começará fechado.

    const toggleDrawerOpen = useCallback(() => {

        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen) //O estado do drawer será alterado de "aberto" para "fechado" e vice-versa.
    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    );
};