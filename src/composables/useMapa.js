import {ref} from 'vue';

export default function useMapa(){
    const zoom = ref(15);
    const center = ref([-27.3420963,-65.5921998]);

    function pin(e){
        const UbicacionMarcador = e.target.getLatLng();
        center.value = [UbicacionMarcador.lat, UbicacionMarcador.lng];
    }

    return{
        zoom,
        center,
        pin
    }
}