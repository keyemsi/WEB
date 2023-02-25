const firebaseConfig = {
    apiKey: "AIzaSyA8KlCatCuPlbCX7BXFeYocl-7i8GSSvG0",
    authDomain: "automatas-f0f70.firebaseapp.com",
    databaseURL: "https://automatas-f0f70-default-rtdb.firebaseio.com",
    projectId: "automatas-f0f70",
    storageBucket: "automatas-f0f70.appspot.com",
    messagingSenderId: "151039348950",
    appId: "1:151039348950:web:bf75d3d63f752ec5fd3977"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  // Initialize Firebase
  



function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
    
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var Modelo = document.getElementById("Input2").value;
    var correo = document.getElementById("Input3").value;
    var Daños = document.getElementById("Input4").value;
    var Imei = document.getElementById("Input5").value;
    var Marca = document.getElementById("Input6").value;
    var Detalles = document.getElementById("Input7").value;
    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Celular = {
            id, //matricula:id
            Modelo,
            correo,
            Daños,
            Imei,
            Marca,
            Detalles,

        }

        //console.log(alumno);

        firebase.database().ref('Celulares/' + id).update(Celular).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Celulares').push().key;
    //data[`Celulares/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Celulares');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(Celulares){
    
    if(Celulares!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Celulares.id;
        cell2.innerHTML = Celulares.Modelo; 
        cell3.innerHTML = Celulares.correo;
        cell4.innerHTML = Celulares.Daños; 
        cell5.innerHTML = Celulares.Imei; 
        cell6.innerHTML = Celulares.Marca;
        cell7.innerHTML = Celulares.Detalles;
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Celulares.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Celulares.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Celulares/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Celulares/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Celular){
    if(Celular!=null)
    {
        document.getElementById("Input1").value=Celular.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Celular.Modelo;
        document.getElementById("Input3").value=Celular.correo;
        document.getElementById("Input4").value=Celular.Daños;
        document.getElementById("Input5").value=Celular.Imei;
        document.getElementById("Input6").value=Celular.Marca;
        document.getElementById("Input7").value=Celular.Detalles;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Celulares");
    ref.orderByChild("Daños").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Celular){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Celular.id;
    cell2.innerHTML = Celular.Modelo; 
    cell3.innerHTML = Celular.correo;
    cell4.innerHTML = Celular.Daños; 
    cell5.innerHTML = Celular.Imei; 
    cell6.innerHTML = Celular.Marca;
    cell7.innerHTML = Celular.Detalles; 
   
}

