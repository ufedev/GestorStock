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



// APLICACIÓN

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
            if (opcion_categoria === '1') {
                const cat = await conexion.query(`
                    SELECT * FROM tipo_p_s
                    `,
                    {
                        type: QueryTypes.SELECT
                    })
                console.log('Categorias: ')

                cat.forEach(function (categoria) {
                    console.log(categoria.id + ' -- ' + categoria.descripcion)
                })

                await input('')
            }
            if (opcion_categoria === '3') {
                console.clear()
                console.log('Seleccione la categoria actualizar: ')
                const categorias = await conexion.query(`SELECT * FROM tipo_p_s`, {
                    type: QueryTypes.SELECT
                })
                const listaIds = []
                categorias.forEach((categoria) => {
                    console.log(`${categoria.id} - ${categoria.descripcion}`)
                    listaIds.push(categoria.id)
                })
                const id = Number(await input(': '))
                if (listaIds.includes(id)) {


                    const nuevo_nombre = await input('Ingrese el nuevo nombre: ')
                    if (nuevo_nombre.trim() === "") {
                        console.log('Raja de aca')
                        await input('')
                        continue
                    }
                    await conexion.query(`
                    UPDATE tipo_p_s SET 
                    descripcion = '${nuevo_nombre}'
                    WHERE id = ${id}`,
                        {
                            type: QueryTypes.UPDATE
                        })
                    console.log('Actualizado correctamente....')
                    await input('')

                } else {
                    console.log('Vuelva a seleccionar... una existente')
                    await input("")
                    continue
                }
                await input('')
            }
            if (opcion_categoria === '4') {
                const categorias = await conexion.query(`
                    SELECT * FROM tipo_p_s
                    `,
                    {
                        type: QueryTypes.SELECT
                    }
                )
                console.log('Seleccione cual eliminará: ')
                const catId = []
                categorias.forEach(function (categoria) {
                    console.log(`${categoria.id} -- ${categoria.descripcion}`)
                    catId.push(categoria.id)
                })
                const opcion_seleccionada = await input(": ")
                if (opcion_seleccionada === '') {
                    console.log('No ha seleccionado nada')
                    await input('')
                    continue
                }

                if (!catId.includes(Number(opcion_seleccionada))) {
                    console.log('La opción seleccionada no existe...')
                    await input('')
                    continue
                }

                await conexion.query(`
                    DELETE FROM tipo_p_s WHERE id=${opcion_seleccionada}
                    `)
                console.log('Eliminado con éxito.')
                await input('')
            }


        }
    }

    if (opcion === '2') {

    }




}




