<script setup>
    import usePropiedades from '../composables/usePropiedades';

    const {conversorPrecio} = usePropiedades()

    defineProps({
        propiedad:{
            type: Object,
            required: true
        }
    })
</script>

<template>
    <v-col cols="12" md="4" class="mx-auto">
        <v-card>
            <v-img :src="propiedad.imagen" height="250" cover/>

            <v-card-title>{{ propiedad.titulo }}</v-card-title>
            <v-card-subtitle class="font-weight-bold text-h5 mb-5 text-green-darken-1">{{ conversorPrecio(propiedad.precio) }}</v-card-subtitle>

            <v-card-item>Habitaciones: {{ propiedad.habitaciones }}</v-card-item>

            <v-card-text class="text-blue-grey-darken-1 text-truncate">{{ propiedad.descripcion }}</v-card-text>

            <v-card-actions>
                <v-btn
                    color="blue"
                    variant="tonal"
                    block
                    :to="{name: 'info-propiedad', params: {id: propiedad.id} }"
                >
                    Más información
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>