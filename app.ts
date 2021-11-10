import  express  from "express";
const cron = require("node-cron");

/* 
Se importan los modulos:
- currencies: monedas iniciales con las que sacar los exchange_rates
- http: axios 
- registro: enlaza con la carpeta database para guardar los resultados de la peticion
*/ 
const {currencies,http,registro} = require("./data");

// Hay que esconder la key
const alpha_key = 'PA9NRL7TRFPKOS52';
const app = express();

// Para sacar los valores al hacer peticiones POST y DELETE
app.use(express.json());
app.use(express.urlencoded({extended:false}));

class Main{

    //funcion para realizar las peticiones web a la API de alphavantage
    static async getRates(){

        const cambio_hora = [];

        //bucle que recorre currencies, monedas iniciales con las que sacar el exchange_rate
        for (var curr of currencies){
            console.log(curr)
            const respuesta_curr = (await http.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&to_currency=EUR&from_currency=${curr}&apikey=${alpha_key}`)).data;
            cambio_hora.push(respuesta_curr)
        }
        const dateee = new Date();
        let hours =dateee.getHours();
        let minutos = dateee.getMinutes();
        const fecha = dateee.toDateString().split(" ").join("_") +"_"+ hours+"_"+minutos;
        //se genera un Item de la clase localstorage por cada peticion (union de las repuestas por cada currencie) => un archivo en la capeta database
        // con el nombre creado por la fecha hora y minutos
        registro.setItem(fecha,JSON.stringify(cambio_hora));
    }

    //metodos add y remove añaden y eliminan currencies a la lista a recorrer para sacar el historial de currencies
    static add(curr:string){
        if (!currencies.includes(curr)){
            currencies.push(curr)
        }
    } 
    static remove(curr:string){
        const index = currencies.indexOf(curr);
        console.log(index)
        if (index > -1) {
            currencies.splice(index, 1);
        }
        
    }
    
}
//metodo GET para imprimir las currencies disponibles
app.get('/', function(req, res){
    res.send(currencies);
});

//metodo POST para agregar una currencie
app.post('/:name', function(req, res){
    Main.add(req.params.name);
    console.log(req.params.name);
    res.status(200).send(currencies)
    //res.send(currencies)
});
//metodo DELETE para eliminar una currencie
app.delete('/:name', function(req, res){
    Main.remove(req.params.name)
    res.send(currencies)
});

//llamada a cron para crear el historial de exchange rates entre las monedas, en la carpeta database
//para pruebas esta seteado para que salte cada minuto
/*
cron.schedule("* * * * *", ()=>{
    Main.getRates();
})
*/

app.listen(5000, () => console.log('Server running'))

