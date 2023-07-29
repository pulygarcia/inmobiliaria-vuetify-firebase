import { computed } from "vue";
import { collection } from "firebase/firestore";
import { useCollection, useFirestore } from 'vuefire'

export default function usePropiedades(){

    const db = useFirestore();
    
    const propiedades = useCollection(collection(db, 'propiedades'));

    const conversorPrecio = computed(() => {
        return (precio) =>    //El computed no debe recibir parámetros, pero se puede pasarle un parámetro a su return si es necesario
            Number(precio).toLocaleString('es-Ar', {
                style: 'currency',
                currency: 'ARS'
            })
        //le quito las llaves al return para que lo de por implícito
    })
    
    return{
        propiedades,
        conversorPrecio
    }
}