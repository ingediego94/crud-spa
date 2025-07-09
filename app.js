document.getElementById('productForm').addEventListener('submit', function(event){
    event.preventDefault();     // previene el envio del fomulario.

    const id = document.getElementById('id').value;
    const producto = document.getElementById('producto').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;

    const newProduct = {
        id: parseInt(id),
        producto: producto,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad)
    };

    addProduct(newProduct);
});