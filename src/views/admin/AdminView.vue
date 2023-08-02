<script setup>
  import usePropiedades from '@/composables/usePropiedades';

  import { conversorPrecio } from '../../helpers';

  const {propiedades} = usePropiedades();
</script>

<template>
  <h2 class="text-center text-h3 font-weight-bold my-5">Panel de Control</h2>

  <v-container>
    <v-btn
      color="red-lighten-1"
      variant="flat"
      :to="{name: 'nueva-propiedad'}"
      class="my-5"
    >Agregar propiedad</v-btn>
  </v-container>


  <v-container class="p-0">
    <v-list>
      <v-list-item
        v-for="propiedad in propiedades"
        :key="propiedad.id"
        class="border mb-5 py-4 d-flex flex-column flex-md-row justify-space-between"
      >
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <v-img :src="propiedad.imagen" width="300"/>
          </v-list-item-media>
        </template>

        <v-list-item-title class="text-h6">{{ propiedad.titulo }}</v-list-item-title>

        <v-list-item-subtitle class="text-subtitle-1 font-weight-bold text-green-darken-1 my-5">{{ conversorPrecio(propiedad.precio) }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn 
            color="info mr-2"
            :to="{name: 'editar-propiedad', params: {id: propiedad.id}}"
          >
            Editar
          </v-btn>
          <v-btn color="red-darken-3">
            Eliminar
          </v-btn>
        </template>

      </v-list-item>
    </v-list>
  </v-container>

</template>