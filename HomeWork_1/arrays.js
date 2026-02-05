//push(): Agregar un elemento al final
let fruticas = ["manzana" , "pera"];
fruticas.push("uva");
console.log(fruticas);

//map(): Crear un nuevo array
let numeros = [1,2,3];
let cuadrados = numeros.map(n => n * n);
console.log(cuadrados);

//filter(): filtar datos
let mayores = numeros.filter(n => n > 1);
console.log(mayores);