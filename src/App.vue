<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/LoginStore';

const authStore = useAuthStore();
</script>

<template>
  <v-card
    elevation="3"
    max-width="1200"
    class="mx-auto"
  >
    <v-layout>
      <v-app-bar
        color="red-lighten-1"
        scroll-behavior="collapse"
      >
        <template v-slot:prepend>
          <v-btn :to="{name: 'inicio'}">
            Inmobiliaria
          </v-btn>
        </template>

        <template v-slot:append>
          <div v-if="authStore.isAuth">
            <v-btn :to="{name: 'admin-propiedades'}">
              Administrador
            </v-btn>
            <v-btn @click="authStore.logout">
              Cerrar sesión
            </v-btn>
          </div>
          <div v-else>
            <v-btn :to="{name: 'inicio'}">
              Inicio
            </v-btn>
            <v-btn :to="{name: 'login'}">
              Iniciar sesión
            </v-btn>
          </div>
        </template>

      </v-app-bar>

      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>

    </v-layout>

  </v-card>
</template>
