import { input } from './utils.mjs'
import { Sequelize, QueryTypes } from 'sequelize'

const conexion = new Sequelize(
    "stock_",
    'root',
    'aezakmi',
    {
        dialect: 'mysql',
        logging: false
    }
)


const nombre = await input()




while (true) {

    console.clear() // LIMPIA LA CONSOLA
    console.log(`
        Programa de stock

        Seleccione opción:
        1 - Categoria
        2 - Productos
        3 - Servicios
        4 - Salir
        
        `)

    const opcion = await input(': ')
    if (opcion === '4') {
        console.log('Saliendo....')
        break
    }

    if (opcion === '1') {
        while (true) {
            console.clear()
            console.log(`
                Sección categorias
                Seleccion una opción:
                1 - Ver todas
                2 - Nueva Categoria
                3 - Actualizar Categoria
                4 - Eliminar Categoria
                5 - Volver
                `)
            const opcion_categoria = await input(": ")
            if (opcion_categoria === "5") {
                break
            }
            if (opcion_categoria === '2') {
                const nueva_cat = await input('Ingrese la nueva categoria: ')

                await conexion.query(
                    `
                    INSERT INTO tipo_p_s (descripcion)
                    VALUES ('${nueva_cat}')
                    
                    `,
                    {
                        type: QueryTypes.INSERT
                    }
                )
                console.log('Categoria agregada correctamente...')
                await input('')
            }


        }
    }


}




