import { Box } from "@mui/material";
import { createContext, useCallback, useContext, useState } from "react";

interface IDrawerContextData {

    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

interface IDrawerOption { //Essa interface representará uma opção no menu do drawer.
    
    icon: string;
    path: string;
    label: string;
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
    
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]); //O Drawer começará fechado.

    const toggleDrawerOpen = useCallback(() => {

        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen) //O estado do drawer será alterado de "aberto" para "fechado" e vice-versa.
    }, []);
    
    
    const handleSetDrawerOptions = useCallback((novasOpcoesDrawer: IDrawerOption[]) => {

        setDrawerOptions(novasOpcoesDrawer); //Essa função preencherá as opções do Drawer de forma dinâmica.
    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions: handleSetDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    );
};