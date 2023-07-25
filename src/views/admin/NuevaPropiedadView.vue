<script setup>
  const cantidad = [1, 2, 3, 4, 5];
</script>

<template>
  <v-card max-width="800" flat class="mx-auto">
    <v-card-title class="text-h4 font-weight-bold text-center my-5" tag="h3">
      Nueva propiedad
    </v-card-title>

    <v-card-subtitle class="text-h5 font-weight-bold text-center py-3 truncate">
      Crea una nueva propiedad llenando el formulario
    </v-card-subtitle>

    <v-form class="mt-10">
          <v-text-field
            class="mb-5"
            type="email"
            label="Titulo propiedad"
          ></v-text-field>

          <v-file-input 
            accept="image/jpeg" 
            label="Imagen de la propiedad"
            prepend-icon="mdi-camera"
            class="mb-5"
          ></v-file-input>

          <v-text-field
            class="mb-5"
            label="Precio"
          ></v-text-field>

          <v-row>
            <v-col cols="12" md="4">
              <v-select
                label="Habitaciones"
                class="mb-5"
                :items="cantidad"
              />
            </v-col>

            <v-col>
              <v-select
                label="Baños"
                class="mb-5"
                :items="cantidad"
              />
            </v-col>
          

            <v-col>
              <v-select
                label="Estacionamientos"
                class="mb-5"
                :items="cantidad"
              />
            </v-col>
          </v-row>

          <v-textarea class="mb-5" label="Descripción de la propiedad"></v-textarea>

          <v-checkbox label="Piscina"/>

          <v-btn type="submit" block class="my-2" color="indigo-darken-1">Crear propiedad</v-btn>
      </v-form>
  </v-card>
</template>