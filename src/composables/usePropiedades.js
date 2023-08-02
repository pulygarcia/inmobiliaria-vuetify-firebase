import {computed, ref} from 'vue'
import { collection } from "firebase/firestore";
import { useCollection, useFirestore } from 'vuefire'

export default function usePropiedades(){

    const db = useFirestore();
    
    const propiedades = useCollection(collection(db, 'propiedades'));

    const piscina = ref(false);

    const propiedadesFiltradas = computed(() => {
        return piscina.value ? 
            propiedades.value.filter(propiedad => propiedad.piscina) : propiedades.value
    })
    
    return{
        propiedades,
        piscina,
        propiedadesFiltradas
    }
}