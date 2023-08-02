<script setup>
    import {useFirestore, useDocument} from 'vuefire';
    import { doc } from "firebase/firestore";
    import { useRoute } from 'vue-router';

    import { conversorPrecio } from '../helpers';

    const route = useRoute();

    const db = useFirestore();
    const docRef = doc(db, "propiedades", route.params.id);
    const propiedadSeleccionada = useDocument(docRef);
    
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

        <v-card-text class="text-center text-grey-darken-1">{{ propiedadSeleccionada?.descripcion }}</v-card-text>
    </v-card>
</template>