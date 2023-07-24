<script setup>
    import { useForm, useField } from 'vee-validate';
    import {loginSchema as validationSchema} from '../schemas/validationSchema';
    import {useAuthStore} from '../stores/LoginStore'

    const {handleSubmit} = useForm({ validationSchema });

    const auth = useAuthStore();
    
    const email = useField('email');
    const password = useField('password');

    const submit = handleSubmit( (values) => {
      auth.login(values);
    })
</script>

<template>
  <div class="my-10">
      <h1 class="text-center mb-5 font-weight-bold">Inicio de sesión</h1>
      <v-sheet width="600" class="mx-auto">
        <v-alert
          v-if="auth.hasError"
          type="error"
          class="my-5"
          title="Error"
          :text="auth.errorActual"
        ></v-alert>

        <v-form @submit.prevent="submit" class="mb-5">
          <v-text-field
            class="mb-3"
            type="email"
            label="Correo electrónico"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            type="password"
            label="Contraseña"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
          ></v-text-field>
          <v-btn type="submit" block class="mt-2" color="indigo-darken-1">Ingresar</v-btn>
        </v-form>
      </v-sheet>
  </div>
</template>