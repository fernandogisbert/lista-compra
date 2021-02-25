

const url = "https://api.airtable.com/v0/appZjIeIIkjmA29vh/Productos?&view=Grid%20view";
const urlBorrar = "https://api.airtable.com/v0/appZjIeIIkjmA29vh/Productos?records[]=";
const urlActualizar ="https://api.airtable.com/v0/appZjIeIIkjmA29vh/Productos"
const authorization = 'Bearer keyswzmG8Q7KZoVp0';
const urlAnyadir = 'https://api.airtable.com/v0/appZjIeIIkjmA29vh/Productos'

var app = new Vue({
    el: '#app',
    data: {
        productos: [],
        productoActualizar: '',
        nuevoProducto: '',
        productoEditar: false
    },
    mounted: function(){
        this.obtenerProductos();

    },
    methods: {
        anyadirProducto: function(){
            fetch(urlAnyadir, {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': authorization
                },
                method: 'POST',
                body: JSON.stringify({
                    "records": [
                        {
                          "fields": {
                            "Nombre": this.nuevoProducto,
                            "Adquirido": false
                          }
                        }]
                })
            })
            .then(()=> this.nuevoProducto = '')
            .then(()=> this.obtenerProductos())

        },
        obtenerProductos: function(){

            fetch(url, {
                headers: {
                    'Authorization': authorization
                }
            })
                .then(function(response) {
                    // Transforma la respuesta. En este caso lo convierte a JSON
                    return response.json();
                })
                .then((json)=> {
                    // Usamos la información recibida como necesitemos
                    console.log(json.records);
                    this.productos = json.records;
                });

        },
        borrarProducto: function(id) {
            // borramos del api
            fetch(urlBorrar.concat(id),{
                headers: {
                    'Authorization': authorization
                },
                method: 'DELETE'
            });
            //borramos del local
            this.productos = this.productos.filter(producto => {
                return producto.id !== id
            })
        },
        actualizarProductoEnAPI: function(id,nuevoTexto) {

            //cierro el input de actualizar con esta linea
            this.productoEditar=false;

            fetch(urlActualizar, {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': authorization

                },
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                          "id": id,
                          "fields": {
                            "Nombre": nuevoTexto
                          }
                        }]
                })
            })
            .then(()=> this.obtenerProductos());

        },
        actualizarAdquiridoEnAPI: function(id,checked) {

            fetch(urlActualizar, {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': authorization

                },
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                          "id": id,
                          "fields": {
                            "Adquirido": checked
                          }
                        }]
                })
            })
            .then(()=> this.obtenerProductos());


            //actualizamos en local
            this.productos = this.productos.map((producto) => {

                if(producto.id === id){
                    let miProducto = producto;
                    miProducto.fields.Adquirido = checked;
                    return miProducto;
                }else{
                    return producto;
                }

            })

        },
        abrirEditar: function(id, nombre) {
            this.productoEditar = id;
            this.productoActualizar = nombre;
            
        }
    }

})
