export const conversorPrecio = (precio) => {
    return Number(precio).toLocaleString('es-Ar', {
            style: 'currency',
            currency: 'ARS'
    })
}