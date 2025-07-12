const url = "http://localhost:3301/products";

// Function to capture data from form once this has been charged on DOM

function initCrearProducto() {
  const form = document.getElementById('productForm');

  if (!form) {
    console.warn('No se encontró el formulario de producto en el DOM.');
    return;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

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
      form.reset();
      await getProducts();
    } catch (error) {
      console.info('Error al crear:', error);
    }
  });
}


// GET method
async function getProducts(){
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
        //         <td>
        //             <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Eliminar</button>
        //             <button class="btn btn-primary btn-sm edit-btn" data-id="${product.id}">Editar</button>
        //         </td>
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
                    <td>
                        <button class="btn btn-primary btn-sm edit-btn" data-id="${product.id}">Editar</button>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Eliminar</button>
                    </td>
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
 getProducts();


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
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        alert("Producto eliminado: ", result);
    }catch(error){
        throw new Error('Error al eliminar: ', error);
    }
    

 }

document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const id = event.target.getAttribute('data-id');
        
        if (confirm(`¿Estás seguro de que deseas eliminar el producto con ID ${id}?`)) {
            try {
                await deleteProducts(id);
                await getProducts(); // refresca la tabla
            } catch (err) {
                console.error('Error eliminando producto:', err);
            }
        }
    }

    if (event.target.classList.contains('edit-btn')) {
        const id = event.target.getAttribute('data-id');
        const container = document.getElementById('content');

        try {
            const response = await fetch(`${url}/${id}`);
            const data = await response.json();

            container.innerHTML = `
                <form id="edit-form"><input type="text" value=${data.producto} placeholder="${data.producto}" /><input type="number" value=${data.precio} placeholder="${data.precio}" /><input type="number" value=${data.cantidad} placeholder="${data.cantidad}" /><button type="submit">Submit</button></form>
            `

            const form = document.getElementById('edit-form')

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const childrens = form.childNodes;

                const newProduct = {
                    id,
                    producto: childrens[0].value,
                    precio: childrens[1].value,
                    cantidad: childrens[2].value
                }

                updateProducts(newProduct)
                .then(res => window.location.reload())
                .catch(err => console.error(err))
            })

        } catch (err) {

        }

    }
});