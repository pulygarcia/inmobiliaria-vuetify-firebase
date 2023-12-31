import { defineStore } from "pinia";
import {ref, computed, onMounted} from 'vue';
import { useRouter } from "vue-router";

import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth();
    const router = useRouter();

    const errores = {
        'auth/user-not-found' : 'Usuario no encontrado',
        'auth/wrong-password' : 'Contraseña incorrecta'
    }
    const errorActual = ref('');
    const usuario = ref(null);

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                usuario.value = user;
            }
        })
    })

    const login = ( values ) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          usuario.value = userCredential.user;
          errorActual.value = '';
          router.push({name: 'admin-propiedades'})
        })
        .catch(error => {
            errorActual.value = errores[error.code];
        })
    }

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            usuario.value = null;
            router.push({name: 'login'})
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    const hasError = computed(() => {
        return errorActual.value
    })

    const isAuth = computed(() => {
        return usuario.value
    })

    return{
        login,
        logout,
        hasError,
        errorActual,
        isAuth
    }
})