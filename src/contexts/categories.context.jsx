import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

export const CategoriesContext = createContext({
    categoriesMap:{},
});

export const CategoriesProvider = ({children})=> {    
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(()=> {
        const getCatregoriesMap = async ()=> {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap)
            setCategoriesMap(categoryMap)
        }
        getCatregoriesMap();
    },[])

    const value = {categoriesMap}
    return (
        <CategoriesContext.Provider value={value}> 
        {children} 
        </CategoriesContext.Provider>
    )
}