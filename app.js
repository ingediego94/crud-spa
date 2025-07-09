const url = "http://localhost:3301/products";

document.getElementById('productForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el comportamiento por defecto

    const id = document.getElementById('id').value;
    const producto = document.getElementById('producto').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;

    const data = {
        id: parseInt(id),
        producto: producto,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad)
    };

    try {
        const resultado = await addProduct(data);
        console.log('Producto creado:', resultado);

        // ✅ Cleaning the form
        document.getElementById('productForm').reset();

    } catch (error) {
        console.info('Error al crear:', error);
    }
});

// GET method
async function getProduct(){
    try{
        const response = await fetch("http://localhost:3301/products");
        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }
        // console.log(resultado.status);   // confirma respuesta del servidor.
        const result = await response.json();
        console.log("Lista de productos: ", result);
    } catch (error){
        console.info('Error al obtener los datos: ', error);
    }
    
};
 getProduct();


 // POST method
 async function addProduct(product) {
    try{
            
        const response = await fetch("http://localhost:3301/products", {
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


//  // PUT method
//  async function updateProducts(productToUpdate) {
    
//     const response = await fetch(`http://localhost:3301/products, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(response)
//     })


//  }