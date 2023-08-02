import { collection } from "firebase/firestore";
import { useCollection, useFirestore } from 'vuefire'

export default function usePropiedades(){

    const db = useFirestore();
    
    const propiedades = useCollection(collection(db, 'propiedades'));
    
    return{
        propiedades
    }
}