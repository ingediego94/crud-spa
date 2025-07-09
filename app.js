const url = "http://localhost:3301/products";

document.getElementById('productForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el comportamiento por defecto

    const id = document.getElementById('id').value;
    const producto = document.getElementById('producto').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;

    const data = {
        id: String(id),
        producto: producto,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad)
    };

    try {
        const resultado = await addProduct(data);
        console.log('Producto creado:', resultado);

        // ✅ Cleaning the form
        document.getElementById('productForm').reset();

        // refreshing table content.
        await getProduct();

    } catch (error) {
        console.info('Error al crear:', error);
    }
});

// GET method
async function getProduct(){
    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }
        // console.log(resultado.status);   // confirma respuesta del servidor.
        const result = await response.json();
        
        // printing data on the table
        const tableResults = document.querySelector("#showProductsTable tbody");

        // result.forEach(product => {
        //     tableResults.innerHTML += `
        //     <tr>
        //         <td>${product.id}</td>
        //         <td>${product.producto}</td>
        //         <td>${product.precio}</td>
        //         <td>${product.cantidad}</td>
        //     </tr>
        //     `;
        // });

        //******************* */


                if (Array.isArray(result)) {
            let html = '';
            result.forEach(product => {
                html += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.producto}</td>
                    <td>${product.precio}</td>
                    <td>${product.cantidad}</td>
                </tr>
                `;
            });
            tableResults.innerHTML = html;
        } else {
            throw new Error('La respuesta del servidor no es un arreglo válido.');
        }



    } catch (error){
        console.info('Error al obtener los datos: ', error);
    }
    
};
 getProduct();


 // POST method
 async function addProduct(product) {
    
    // To validate before to send
    if (!validateProduct(product)) {
        console.log("Producto inválido. No se enviará al servidor.");
        return; // exit the application if the data is incorrect
    }
    
    try{
            
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if(!response.ok){
            throw new Error(`Error Http: ${response.status}`);
        };

        const result = await response.json();
        console.log("Agregado con exito.");
        return result;

    } catch(error){
        console.log("Se ha presentado un error." ,error);
        throw error;
    }
 }


function validateProduct(product){
    if(!product.id || !product.producto || typeof product.precio !== "number" || !product.cantidad){
        console.log("Se presentó un fallo.");
        return false;
    }
    return true;
}



//  PUT method
 async function updateProducts(productToUpdate) {
    
    try{
        const response = await fetch(`${url}/${productToUpdate.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productToUpdate)
        });

        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log("Producto actualizado: ", result);

    } catch(error){
        console.log('Error al actualizar');
        
    }

 }



 // DELETE method
 async function deleteProducts(id) {
    try{
        const response = fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log("Producto eliminado: ", result);
    }catch(error){
        throw new Error('Error al eliminar: ', error);
    }
    

 }



