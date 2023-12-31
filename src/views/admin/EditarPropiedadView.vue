<script setup>
  import {watch} from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {useFirestore, useDocument} from 'vuefire';
  import { doc, updateDoc } from "firebase/firestore";

  import { useField, useForm } from 'vee-validate';
  import "leaflet/dist/leaflet.css";
  import {
      LMap,
      LTileLayer,
      LMarker
  } from "@vue-leaflet/vue-leaflet";
  import useImage from '@/composables/useImage'
  import useMapa from '@/composables/useMapa'
  import { validationSchema } from '@/schemas/nuevaPropiedadSchema'

  const cantidad = [1,2,3,4,5];

  const { url, uploadImage, image } = useImage()
  const { zoom, center, pin } = useMapa()

  const { handleSubmit } = useForm({ validationSchema });

  const titulo = useField('titulo');
  const imagen = useField('imagen');
  const precio = useField('precio');
  const habitaciones = useField('habitaciones');
  const wc = useField('wc');
  const estacionamiento = useField('estacionamiento');
  const descripcion = useField('descripcion');
  const piscina = useField('piscina');

  //obtener el id viendo la url
  const route = useRoute();
  const router = useRouter()

  //Extraer la propiedad a editar
  const db = useFirestore();
  const docRef = doc(db, 'propiedades', route.params.id);

  const propiedadAeditar = useDocument(docRef);

  watch(propiedadAeditar, (propiedadAeditar) => {
    titulo.value.value = propiedadAeditar.titulo
    precio.value.value = propiedadAeditar.precio
    habitaciones.value.value = propiedadAeditar.habitaciones
    wc.value.value = propiedadAeditar.wc
    estacionamiento.value.value = propiedadAeditar.estacionamiento
    descripcion.value.value = propiedadAeditar.descripcion
    piscina.value.value = propiedadAeditar.piscina
    center.value = propiedadAeditar.ubicacion
  })

  
  
  const submit = handleSubmit(async(values) => {
    //Saco el valor imagen del objeto para que no muestre undefined
    const {imagen, ...propiedadAeditar} = values;

    if(image.value){
      const data = {
        ...propiedadAeditar,
        imagen: url.value,
        ubicacion: center.value
      }

      //actualizar en firebase
      await updateDoc(docRef, data);
    }else{
      //unir en un solo objeto la propiedad y la ubicacion del mapa (ya que está en composable aparte)
      const data = {
        ...propiedadAeditar,
        ubicacion: center.value
      }

      //actualizar en firebase
      await updateDoc(docRef, data);
    }

    router.push({name: 'admin-propiedades'})
  })
  
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
        <v-card-title class="mt-5">
            <h1 class="text-h4 font-weight-bold">Editar Propiedad</h1>
        </v-card-title>
        <v-card-subtitle > 
            <p class="text-h5">Edita los detalles de la propiedad</p>
        </v-card-subtitle>

        <v-form class="mt-10">
            <v-text-field
                v-model="titulo.value.value"
                :error-messages="titulo.errorMessage.value"
                label="Titulo"
                class="mb-5"
            ></v-text-field>

            <v-file-input
                v-model="imagen.value.value"
                :error-messages="imagen.errorMessage.value"
                accept="image/jpeg"
                prepend-icon="mdi-camera"
                label="Imagen propiedad"
                class="mb-5"
                @change="uploadImage"
            ></v-file-input>

            <div class="my-5">
                <p class="font-weight-bold">Imagen Actual:</p>

                <img 
                  v-if="image" 
                  :src="image" 
                  alt="imagen propiedad" 
                  width="300"
                />

                <img 
                  v-else 
                  :src="propiedadAeditar?.imagen" 
                  alt="imagen propiedad" 
                  width="300"
                />
            </div>


            <v-text-field
                v-model="precio.value.value"
                :error-messages="precio.errorMessage.value"
                label="Precio"
                class="mb-5"
            ></v-text-field>

            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Habitaciones"
                        class="mb-5"
                        :cantidad="cantidad"
                        v-model="habitaciones.value.value"
                        :error-messages="habitaciones.errorMessage.value"
                    />
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="WC"
                        class="mb-5"
                        :cantidad="cantidad"
                        v-model="wc.value.value"
                        :error-messages="wc.errorMessage.value"
                    />
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select 
                        label="Lugares Estacionamiento"
                        class="mb-5"
                        :cantidad="cantidad"
                        v-model="estacionamiento.value.value"
                        :error-messages="estacionamiento.errorMessage.value"
                    />
                </v-col>
            </v-row>

            <v-textarea
                v-model="descripcion.value.value"
                :error-messages="descripcion.errorMessage.value"
                label="Descripción"
                class="mb-5"
            ></v-textarea>

            <v-checkbox 
                v-model="piscina.value.value"
                label="Piscina"
            ></v-checkbox>


            <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
            <div class="pb-10">
                <div style="height:600px">
                    <LMap 
                        v-model:zoom="zoom" 
                        :center="center" 
                        :use-global-leaflet="false" 
                    >
                        <LMarker
                            :lat-lng="center"
                            draggable
                            @moveend="pin"
                        />
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ></LTileLayer>
                    </LMap>
                </div>
            </div>

                <v-btn
                    color="indigo-darken-1"
                    block
                    @click="submit"
                >
                    Guardar Cambios
                </v-btn>
        </v-form>
  </v-card>
</template>