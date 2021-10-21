var solicitud; 
var db;
var primer;
var datos = new Array();

function iniciar() {
    solicitud = indexedDB.open("busquedasBD", 2);

    solicitud.onsuccess = function(evt) {
        solicitud.result; 
        db = solicitud.result;
        llenarDatos();
    };

    solicitud.onupgradeneeded = function(evt) {
        var objectStore =  solicitud.result.createObjectStore("historial", {KeyPath: "index" , autoIncrement: true});
    };
}

function agregarObjeto(obj) {
    console.log('agregando ' + obj)

    var transaction = solicitud.result.transaction(["historial"], "readwrite");
    var objectStore = transaction.objectStore("historial");

    if(datos.includes(obj)){
        return;
    }

    if(primer && primer > 10){
        objectStore.add(obj, 1);
    } else {
        objectStore.add(obj);
    }
    llenarDatos();
}

function retornarPrimerElem(){
    var objectStore = db.transaction("historial").objectStore("historial");
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if(cursor && cursor.key) {
            primer = cursor.key;
        }
    };
}

function llenarDatos(){
    datos = new Array();
    var objectStore = db.transaction("historial").objectStore("historial");
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if(cursor && cursor.key) {
            datos.push(cursor.value);
            cursor.continue();
        }
    };
}