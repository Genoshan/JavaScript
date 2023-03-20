class Prestamos {
    constructor(tipo, moneda, monto, cantCuotas) {
        this.tipo = tipo;
        this.moneda = moneda;
        this.monto = monto;
        this.cantCuotas = cantCuotas;
    }
}

let arrayprestamos = []
let prestamosCargados = []
let totalAPagar = 0
let usuario = localStorage.getItem('usuario')
let montoenpesos = 0

//Funciones

    //CotizacionDiaria
    //Invocamos una funcion que obtiene la cotizacion diaria de una api gratuita llamada 
    //openexchangerates.org
    //Realiza la equivalencia de dolares a Pesos uruguayos en nuestro caso.

    obtengoCotizacion('USD','UYU')
    .then(tasa => {
        const nuevatasa = tasa;              
        montoenpesos = nuevatasa; 
    })
    .catch(error => console.error(error));


function Bienvenida() {
    let nombre = prompt("Ingrese su nombre")
    alert("Bienvenid@ " + nombre + " al simulador de prestamos, a continuacion podra escojer los tipos de prestamo");
}


function HTMLcargarPrestamos() {
    //Obtengo valores ingresados por el usuario desde el formulario web
    let nombreusUario = document.getElementById('formusuario').value
    let tipo = document.getElementById('formTipos').value
    let moneda = document.getElementById('formMonedas').value
    let monto = document.getElementById('formMonto').value
    let cantCuotas = document.getElementById('formCuotas').value
    

    if (tipo === "0") {
        tipo = "Automotor"
    }
    else if (tipo === "1") {
        tipo = "Inmobiliario"
    }

    if (tipo === "Automotor" || tipo === "Inmobiliario") {

        if (moneda === "0") {
            moneda = "Pesos" 
        }
        else if (moneda === "1") {
            moneda = "Dolares"
        }
        //Creamos el objeto prestamo con los datos cargados por el usuario
        const nuevoPrestamo = new Prestamos(tipo, moneda, monto, cantCuotas)
        
        //Añadimos el prestamo a un array de prestamos para luego mostrarlos en el listado
        arrayprestamos.push(nuevoPrestamo)        

        if (nuevoPrestamo.tipo === "Automotor") {
            prestamoAutomotor()
        }
        else if (nuevoPrestamo.tipo === "Inmobiliario") {
            prestamoInmobiliario()
        }
    }
    localStorage.removeItem('usuario')
    
}

function mostrarListadoPrestamos() {
    let resultadoPesos = ""
    let resultadoDolares = ""

    //Creo copia del array de objetos para poder filtrar por moneda

    let prestamoPesos = arrayprestamos.slice().filter(prestamo => prestamo.moneda === 'Pesos');
    let prestamoDolares = arrayprestamos.slice().filter(prestamo => prestamo.moneda === 'Dolares');

    prestamoPesos.forEach(prestamo => {
        resultadoPesos += "Tipo: " + prestamo.tipo + " - "  + "Monto: " + prestamo.monto + " - " + "Cantidad de Cuotas: " + "\n" + prestamo.cantCuotas + " "
    });

    prestamoDolares.forEach(prestamo => {
        resultadoDolares += "Tipo: " + prestamo.tipo + " - " + " " + "Monto: " + prestamo.monto + " - " + " " + "Cantidad de Cuotas: " + prestamo.cantCuotas + " "
    });

    if (usuario==undefined) {
        Swal.fire({
            title: `No Hay prestamos registrados`,            
            icon: 'error',
            position: 'center',
            confirmButtonText: 'Ok!'
        })
    }
    //Mostramos los prestamos en diferentes monedas
    else{    
        
    Swal.fire({
        title: `${usuario}`,
        html: `<hr> Los préstamos solicitados en pesos son <hr> <br>${resultadoPesos} <br> <hr> Los préstamos solicitados en dólares son <br> <hr> ${resultadoDolares}`,
        icon: 'success',
        position: 'center',
        confirmButtonText: 'Ok!'
    })

    }

}
function prestamoAutomotor() {
    let resultado;    

    //Recorro el array de prestamos
    arrayprestamos.forEach(prestamo => {
        let intCapital = parseInt(prestamo.monto)
        let intcantCuotas = parseInt(prestamo.cantCuotas)

        //Calculo del interes capital ingresado + tasa de interes * cantidad de cuotas ingresadas + el capital 
        //Dolares = 0.10 anual
        //Pesos = 0.20 anual

        if (prestamo.moneda === "Dolares") {
            resultado = intCapital * (0.10 * intcantCuotas / 12) + intCapital
        }
        else if (prestamo.moneda === "Pesos") {
            resultado = intCapital * (0.20 * intcantCuotas / 12) + intCapital
        }

        moneda = prestamo.moneda

    });
    totalAPagar = resultado
}

function prestamoInmobiliario() {
    let resultado;    

    //Recorro el array de prestamos
    arrayprestamos.forEach(prestamo => {        
        let intCapital = parseInt(prestamo.monto)
        let intcantCuotas = parseInt(prestamo.cantCuotas)

        //Calculo del interes capital ingresado + tasa de interes * cantidad de cuotas ingresadas + el capital 
        //Dolares = 0.30 anual
        //Pesos = 0.50 anual

        if (prestamo.moneda === "Dolares") {
            resultado = intCapital * (0.30 * intcantCuotas / 12) + intCapital
        }
        else if (prestamo.moneda === "Pesos") {
            resultado = intCapital * (0.50 * intcantCuotas / 12) + intCapital
        }

        if (resultado === undefined) {
            alert("El monto no puede estar vacio")
            cargarPrestamos();
        }

        moneda = prestamo.moneda

    });
    totalAPagar = resultado
}

//Calcular Prestamo
const btn = document.querySelector('#calcular-btn')
btn.addEventListener('click', () => {    
    localStorage.removeItem('usuario');
    localStorage.getItem('usuario')
    if (!usuario) {
        usuario = document.getElementById('formusuario').value
        localStorage.setItem('usuario', usuario)
        console.log(usuario)
    }
    if (usuario == "") {
        
        Swal.fire({
            title: `Indique su nombre`,
            text: ``,
            icon: 'error',
            position: 'center',
            confirmButtonText: 'Ok!'
        })        
    }
    else {
        HTMLcargarPrestamos();

        arrayprestamos.forEach(prestamo => {            
            if (prestamo.moneda === "Dolares") {
                Swal.fire({
                    title: `${usuario}`,
                    text: `El total a pagar es ${totalAPagar} + "\n" + "En Pesos es: " + ${totalAPagar* parseInt(montoenpesos)} `,
                    icon: 'success',
                    position: 'center',
                    confirmButtonText: 'Ok!'
                })  
            }
            else if (prestamo.moneda === "Pesos") {
                Swal.fire({
                    title: `${usuario}`,
                    text: `El total a pagar es ${totalAPagar}`,
                    icon: 'success',
                    position: 'center',
                    confirmButtonText: 'Ok!'
                })  
            }
        });      
    }    
});

//Listar Prestamos
const btnListado = document.querySelector('#listar-btn')
btnListado.addEventListener('click', () => {
    mostrarListadoPrestamos();
});

//Cotizacion - Funcion asincronica que genera la conversion de determinada moneda con la cotizacion diaria utilizando una api gratuita con 
//su api key correspondiente

  function obtengoCotizacion(baseCurrency, targetCurrency) {
    const apiKey = '7230c4d0000a4a2a9b6a6fd8a6b9c26f';
    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${baseCurrency}&symbols=${targetCurrency}`;
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[targetCurrency];
        return rate;
      })
      .catch(error => console.error(error));
  }
  