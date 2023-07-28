<script setup>
  import { useForm, useField } from 'vee-validate';
  import { validationSchema, imageSchema } from '@/schemas/nuevaPropiedadSchema';

  import { useFirestore } from 'vuefire';
  import { collection, addDoc } from "firebase/firestore"; 

  import useImage from '@/composables/useImage'
  import useMapa from '@/composables/useMapa';

  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

  import { useRouter } from 'vue-router';

  const router = useRouter();

  const { uploadImage, image, url } = useImage();
  const {zoom, center, pin} = useMapa();
 
  const cantidad = [1, 2, 3, 4, 5]; //options para los select

  const {handleSubmit} = useForm({
    validationSchema:{
      ...validationSchema,
      ...imageSchema
    }
  });

  const db = useFirestore();

  //CAMPOS
  const titulo = useField('titulo');
  const imagen = useField('imagen');
  const precio = useField('precio');
  const habitaciones = useField('habitaciones');
  const wc = useField('wc');
  const estacionamiento = useField('estacionamiento');
  const piscina = useField('piscina', null, {
    initialValue: false
  });
  const descripcion = useField('descripcion');

  
  const submit = handleSubmit(async(values) => {
    const {imagen, ...propiedad} = values;

    const docRef = await addDoc(collection(db, "propiedades"), {
      ...propiedad,
      imagen: url.value,
      ubicacion: center.value
    });
    
    //Si se agrego correctamente... redireccionar al admin panel
    if(docRef.id){
      router.push({name: 'admin-propiedades'});
    }
  })


</script>

<template>
  <v-card max-width="800" flat class="mx-auto">
    <v-card-title class="text-h4 font-weight-bold text-center my-5" tag="h3">
      Nueva propiedad
    </v-card-title>

    <v-card-subtitle class="text-h5 font-weight-bold text-center py-3 text-wrap">
      Crea una nueva propiedad llenando el formulario
    </v-card-subtitle>

    <v-form class="mt-10">
          <v-text-field
            class="mb-5"
            type="email"
            label="Titulo propiedad"
            v-model="titulo.value.value"
            :error-messages="titulo.errorMessage.value"
          ></v-text-field>

          <v-file-input 
            accept="image/jpeg" 
            label="Imagen de la propiedad"
            prepend-icon="mdi-camera"
            class="mb-5"
            v-model="imagen.value.value"
            :error-messages="imagen.errorMessage.value"
            @change="uploadImage"
          ></v-file-input>

          <div v-if="image" class="my-5">
            <p class="font-weight-bold">Imagen propiedad: </p>
            <img :src="image" alt="imagen propiedad" class="w-25">
          </div>

          <v-text-field
            class="mb-5"
            label="Precio"
            v-model="precio.value.value"
            :error-messages="precio.errorMessage.value"
          ></v-text-field>

          <v-row>
            <v-col cols="12" md="4">
              <v-select
                label="Habitaciones"
                class="mb-5"
                :items="cantidad"
                v-model="habitaciones.value.value"
                :error-messages="habitaciones.errorMessage.value"
              />
            </v-col>

            <v-col>
              <v-select
                label="Baños"
                class="mb-5"
                :items="cantidad"
                v-model="wc.value.value"
                :error-messages="wc.errorMessage.value"
              />
            </v-col>
          

            <v-col>
              <v-select
                label="Estacionamientos"
                class="mb-5"
                :items="cantidad"
                v-model="estacionamiento.value.value"
                :error-messages="estacionamiento.errorMessage.value"
              />
            </v-col>
          </v-row>

          <v-textarea class="mb-5" label="Descripción de la propiedad" v-model="descripcion.value.value" :error-messages="descripcion.errorMessage.value"></v-textarea>

          <v-checkbox label="Piscina" v-model="piscina.value.value"/>

          <h2 class="font-weight-bold text-center">Ubicación</h2>

          <div class="py-10">
            <div style="height:600px;">
                <l-map
                  v-model:zoom="zoom"
                  :center="center"
                  :use-global-leaflet="false"
                >
                  <LMarker 
                    :lat-lng="center"
                    draggable
                    @moveend="pin"
                  />

                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  ></l-tile-layer>
                </l-map>
            </div>
          </div>


          <v-btn type="submit" @click="submit" block class="my-2" color="indigo-darken-1">Crear propiedad</v-btn>
      </v-form>
  </v-card>
</template>