<script setup>
    import {watch} from 'vue';

    import {useFirestore, useDocument} from 'vuefire';
    import { doc } from "firebase/firestore";
    import { useRoute } from 'vue-router';

    import { conversorPrecio } from '../helpers';

    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
    import useMapa from '../composables/useMapa'

    const route = useRoute();

    const db = useFirestore();
    const docRef = doc(db, "propiedades", route.params.id);
    const propiedadSeleccionada = useDocument(docRef);

    const {zoom, center} = useMapa();

    watch(propiedadSeleccionada, (propiedadSeleccionada) => {
        center.value = propiedadSeleccionada.ubicacion;
    })
    
</script>

<template>
    <h2 class="text-center text-h4 font-weight-bold my-10">Información de la propiedad</h2>

    <v-card class="mx-auto mt-5" max-width="700">

      <v-img :src="propiedadSeleccionada?.imagen" height="400" cover/>

        <v-card-title class="mt-5 text-center text-h6 py-5 font-weight-bold">{{ propiedadSeleccionada?.titulo }}</v-card-title>

        <div class="d-flex flex-column flex-md-row bg-blue-grey-lighten-5">
            <v-card-text class="font-weight-medium">Precio: <span class="font-weight-bold text-green">{{ conversorPrecio(propiedadSeleccionada?.precio) }}</span></v-card-text>
            <v-card-text class="font-weight-medium">Habitaciones: <span class="font-weight-bold">{{ propiedadSeleccionada?.habitaciones }}</span></v-card-text>
            <v-card-text class="font-weight-medium">Baños: <span class="font-weight-bold">{{ propiedadSeleccionada?.wc }}</span></v-card-text>
            <v-card-text class="font-weight-medium">Estacionamientos: <span class="font-weight-bold">{{ propiedadSeleccionada?.estacionamiento }}</span></v-card-text>
        </div>

        
        <div class="py-10">
            <v-row>
                <v-col cols="12" md="7">
                    <v-card-text class="text-grey-darken-1">{{ propiedadSeleccionada?.descripcion }}</v-card-text>
                </v-col>

                <v-col cols="12" md="5">
                    <div style="height:400px;">
                        <l-map
                        v-model:zoom="zoom"
                        :center="center"
                        :use-global-leaflet="false"
                        >
                            <LMarker 
                                :lat-lng="center"
                            />

                            <l-tile-layer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            ></l-tile-layer>
                        </l-map>
                    </div>
                </v-col>
            </v-row>    
        </div>
    </v-card>
</template>