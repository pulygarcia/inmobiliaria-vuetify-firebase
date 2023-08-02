<script setup>
  import usePropiedades from '../composables/usePropiedades';
  import Propiedad from '../components/Propiedad.vue';

  const {propiedadesFiltradas, piscina} = usePropiedades();

</script>

<template>
  <main>
    <h1 class="text-center text-h4 font-weight-bold my-5">Propiedades Disponibles</h1>

    <v-card class="py-10" flat>
      <v-checkbox label="Piscina" v-model="piscina"/>

      <v-row>
        <Propiedad
          v-for="propiedad in propiedadesFiltradas"
          :propiedad="propiedad"
          :key="propiedad.id"
        />
      </v-row>
    </v-card>
  </main>
</template>