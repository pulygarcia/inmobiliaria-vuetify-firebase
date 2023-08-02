import {computed, ref} from 'vue'
import { collection } from "firebase/firestore";
import {  ref as storageRef, deleteObject } from "firebase/storage";
import { useCollection, useFirestore, useFirebaseStorage } from 'vuefire'
import { doc, deleteDoc } from "firebase/firestore";

export default function usePropiedades(){

    const db = useFirestore();
    const storage = useFirebaseStorage();

    const propiedades = useCollection(collection(db, 'propiedades'));

    const piscina = ref(false);

    const propiedadesFiltradas = computed(() => {
        return piscina.value ? 
            propiedades.value.filter(propiedad => propiedad.piscina) : propiedades.value
    })

    async function eliminarPropiedad(id, urlImagen){
        const propiedadAeliminar = doc(db, "propiedades", id);
        //Referencia a la ubicacion de la imagen en firebase storage
        const imagenRef = storageRef(storage, urlImagen);

        if(confirm('¿Desea eliminar la propiedad?')){
            /*await deleteDoc(propiedadAeliminar);
            await deleteObject(imagenRef);*/
            await Promise.all([
                deleteDoc(propiedadAeliminar),
                deleteObject(imagenRef)
            ])
        }
    }
    
    return{
        propiedades,
        piscina,
        propiedadesFiltradas,
        eliminarPropiedad
    }
}