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

//Funciones

function Bienvenida() {
    let nombre = prompt("Ingrese su nombre")
    alert("Bienvenid@ " + nombre + " al simulador de prestamos, a continuacion podra escojer los tipos de prestamo");
}


function HTMLcargarPrestamos() {
    //Obtengo valores ingresados por el usuario
    let nombreusUario = document.getElementById('formusuario').value
    let tipo = document.getElementById('formTipos').value
    let moneda = document.getElementById('formMonedas').value
    let monto = document.getElementById('formMonto').value
    let cantCuotas = document.getElementById('formCuotas').value

    //const nuevoPrestamo = new Prestamos(tipo, moneda, monto, cantCuotas)    

    let montoendolares=0

    

    if (tipo === "0") {
        tipo = "Automotor"
    }
    else if (tipo === "1") {
        tipo = "Inmobiliario"
    }

    console.log(tipo)

    if (tipo === "Automotor" || tipo === "Inmobiliario") {

        if (moneda === "0") {
            moneda = "Pesos" 
        }
        else if (moneda === "1") {
            moneda = "Dolares"
        }

        console.log(moneda)
        if (moneda === "Dolares") {
            //si la moneda es en dolares , traemos la cotizacion diaria
            console.log("Elegi :" + document.getElementById('formMonedas').value) 
            
            
            //CotizacionDiaria
            obtengoCotizacion('USD','UYU')
            .then(tasa => {
              const nuevatasa = tasa;              
              montoendolares = nuevatasa; 
              console.log("Adentro del then vale: "+ montoendolares)
              console.log("Total a pagar en Pesos :" + monto * montoendolares);
              const nuevoPrestamo = new Prestamos(tipo, moneda, montoendolares, cantCuotas)
            })
            .catch(error => console.error(error));
            

        }
        else {
            console.log("Elegi la otra moneda")            
        }
        
        arrayprestamos.push(nuevoPrestamo)
        console.log(nuevoPrestamo)
        console.log(arrayprestamos)

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
        resultadoPesos += "Tipo: " + prestamo.tipo + " - " + " " + "Monto: " + prestamo.monto + " - " + " " + "Cantidad de Cuotas: " + prestamo.cantCuotas
    });

    prestamoDolares.forEach(prestamo => {
        resultadoDolares += "Tipo: " + prestamo.tipo + " - " + " " + "Monto: " + prestamo.monto + " - " + " " + "Cantidad de Cuotas: " + prestamo.cantCuotas
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
        html: `Los préstamos solicitados en pesos son <br> ${resultadoPesos}<br>Los préstamos solicitados en dólares son <br> ${resultadoDolares}`,
        icon: 'success',
        position: 'center',
        confirmButtonText: 'Ok!'
    })

    }
    //CotizacionDiaria
    obtengoCotizacion('USD','UYU')
    .then(rates => console.log(rates))
    .catch(error => console.error(error));
}


function prestamos() {
    let opcion = prompt("Ingrese una opcion: \n 1: Simular Prestamo Automotor \n 2: Simular Prestamo Inmobiliario \n 3: Informe de Prestamos \n 4: Finalizar");

    while (opcion != 3) {
        if (opcion === "1") {
            prestamoAutomotor()
        }
        if (opcion === "2") {
            prestamoInmobiliario()
        }
        alert("Gracias por su Visita!");
        opcion = "4";
        break;
    }
}


function prestamoAutomotor() {
    let resultado;
    let moneda;

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
    let moneda;

    //Recorro el array de prestamos
    arrayprestamos.forEach(prestamo => {
        console.log(prestamo);
        let intCapital = parseInt(prestamo.monto)
        let intcantCuotas = parseInt(prestamo.cantCuotas)

        console.log(prestamo.moneda)
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
        Swal.fire({
            title: `${usuario}`,
            text: `El total a pagar es ${totalAPagar}`,
            icon: 'success',
            position: 'center',
            confirmButtonText: 'Ok!'
        })
        
    }
    
});

//Listar Prestamos
const btnListado = document.querySelector('#listar-btn')
btnListado.addEventListener('click', () => {
    mostrarListadoPrestamos();
});

//Cotizacion 
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
  