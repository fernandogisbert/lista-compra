

const url = "https://api.airtable.com/v0/appZjIeIIkjmA29vh/Productos?maxRecords=3&view=Grid%20view";
const authorization = 'Bearer keyswzmG8Q7KZoVp0';

var app = new Vue({
    el: '#app',
    data: {

        productos: []
    },
    mounted: function(){
        this.obtenerProductos();

    },
    methods: {
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

        }
    }

})
