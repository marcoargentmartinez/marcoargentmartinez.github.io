var objetoAjax;
function AJAXCrearObjeto(){
    if(window.XMLHttpRequest) { 
        // navegadores que siguen los estándares 
        objetoAjax = new XMLHttpRequest(); 
    } 
    else { 
        // navegadores obsoletos 
        objetoAjax = new ActiveXObject("Microsoft.XMLHTTP"); 
    } 
    return objetoAjax;
}


function consultardatosclinica(){// consulta los datos de la clinica  para despues pasarselo a responderdatosclinica
  
    objetoAjax = AJAXCrearObjeto();
    //alert("objeto creado");
    
    objetoAjax.open('GET', 'servidor/consultadatosclinica.php', true);
    //Conecta con el servidor
    objetoAjax.send();
    //Se ejecuta cuando cambie el estado de la petición
    objetoAjax.onreadystatechange=responderdatosclinica;
    

}

function responderdatosclinica(){ //funcion que añade los datos de la clinica al pulsar en quienes somos y los borra si existen
eliminardatosclinica();
    if (objetoAjax.readyState == 4){
        if (objetoAjax.status == 200) {

            //alert(objetoAjax.responseText);
            var aux = objetoAjax.responseText;
            var obj_json = JSON.parse(aux);
            var p1=document.createElement("p");
            var p2=document.createElement("p");
            var p3=document.createElement("p");
            var h2=document.createElement("h2");
            h2.appendChild(document.createTextNode("DATOS DE NUESTRA CLINICA"));
            var article = document.getElementById("article2");
            var section=document.createElement("section");
            article.appendChild(section);
            var denominacion = document.createTextNode(obj_json.denominacion);
            //alert(obj_json);

            p1.appendChild(denominacion);
            var telefono = document.createTextNode(" Telefono: "+obj_json.telefono);
            //alert(obj_json);

            p2.appendChild(telefono);
            var direccion = document.createTextNode(" Direccion: "+obj_json.direccion);
            //alert(obj_json);

            p3.appendChild(direccion);
            section.appendChild(h2);
            section.appendChild(p1);
            section.appendChild(p2);
            section.appendChild(p3);

            section.setAttribute("id","datosclinica")
        }        
    }
}

function eliminardatosclinica(){   //funcion que borra los datos de la clinica
    var section=document.getElementById("datosclinica");
    if(section !== null){
     var padre = section.parentNode;
      padre.removeChild(section);
    }   
}

function consultarespecialidades(){

    objetoAjax = AJAXCrearObjeto();
    //alert("objeto creado");
    
    objetoAjax.open('GET', 'servidor/consultarespecialidades.php', true);
    //Conecta con el servidor
    objetoAjax.send();
    //Se ejecuta cuando cambie el estado de la petición
    objetoAjax.onreadystatechange=responderespecialidades;
}

function responderespecialidades(){ 
eliminardatosclinica();
borrarinicio();
    if (objetoAjax.readyState == 4){
        if (objetoAjax.status == 200) {

            //alert(objetoAjax.responseText);
            var aux = objetoAjax.responseText;
            var obj_json = JSON.parse(aux);
            var p1=document.createElement("p");
       
            var h2=document.createElement("h2");
            h2.appendChild(document.createTextNode("Seleccione especialidad"));
            var article = document.getElementById("article");
            var section=document.createElement("section");
            article.appendChild(section);
            var count = Object.keys(obj_json).length;
          
            section.appendChild(h2);
            for (var i = 0; i < count; i++){
            
            var texto = document.createTextNode(obj_json[i].nombre);
            //alert(obj_json);
            var p1=document.createElement("p");
            p1.appendChild(texto);
            p1.setAttribute("class","enlinea");
            


            var img=document.createElement("img");
            img.setAttribute("src", obj_json[i].imagen);
            img.setAttribute("class", "imgespecialidad");
            var div=document.createElement("div");
            div.appendChild(p1);
            div.appendChild(img);
            div.setAttribute("id",obj_json[i].nombre);
            div.setAttribute("value",obj_json[i].nombre);
            div.setAttribute("onClick","consultarmedicos("+obj_json[i].id+")");
            section.appendChild(div);
            
            }
             var section2=document.createElement("section");
            article.appendChild(section2);
            section2.setAttribute("id","medicos");



            
            
            
            
           // section.appendChild(p1);
          

            section.setAttribute("id","especialidades");
            consultardatosclinica();
        }        
    }
}

function consultarmedicos(especialidad){

    objetoAjax = AJAXCrearObjeto();
    //alert("objeto creado");
    
    objetoAjax.open('GET', 'servidor/consultarmedicos.php?especialidad='+especialidad, true);
    //Conecta con el servidor
    objetoAjax.send();
    //Se ejecuta cuando cambie el estado de la petición
    objetoAjax.onreadystatechange=respondermedicos;
}

function respondermedicos(){ 

    if (objetoAjax.readyState == 4){
        if (objetoAjax.status == 200) {
        	eliminarmedicos();
            //alert(objetoAjax.responseText);
            var aux = objetoAjax.responseText;
            var obj_json = JSON.parse(aux);
            var p1=document.createElement("p");
            var count = (obj_json).length;
            var h2=document.createElement("h2");
            h2.appendChild(document.createTextNode(" Seleccione médico de "+obj_json[count-1]));
            var article = document.getElementById("article");
            var section=document.createElement("section");
            article.appendChild(section);
         
            
            section.appendChild(h2);
            for (var i = 0; i < count-1; i++){
            
            var texto = document.createTextNode(obj_json[i].nombre+" "+obj_json[i].apellidos);
            //alert(obj_json[i].foto);
            var p1=document.createElement("p");
            p1.appendChild(texto);
            p1.setAttribute("class","enlinea");
            var textoboton=document.createTextNode("Seleccionar");
             var button=document.createElement("button");
             button.appendChild(textoboton);
            button.setAttribute("class", "btn btn-primary");
            button.setAttribute("onclick","consultarcalendariomedico("+obj_json[i].id+") , mostrarmedico("+obj_json[i].id+",'"+obj_json[i].nombre+"','"+obj_json[i].apellidos+"','"+obj_json[i].foto+"')");
            


            
            var div=document.createElement("div");
            div.appendChild(p1);
            div.appendChild(button);
            
            
            section.appendChild(div);
            
            }



            
            
            
            
           // section.appendChild(p1);
          

            section.setAttribute("id","medicos");

      

        }        
    }
}

function eliminarmedicos(){   //funcion que borra los medicos
    var section=document.getElementById("medicos");
    if(section !== null){
     var padre = section.parentNode;
      padre.removeChild(section);
    }   



}
function consultarcalendariomedico(id){

    objetoAjax = AJAXCrearObjeto();
    //alert("objeto creado");
    
    objetoAjax.open('GET', 'servidor/consultaragendamedico.php?id='+id, true);
    //Conecta con el servidor
    objetoAjax.send();
    //Se ejecuta cuando cambie el estado de la petición
    objetoAjax.onreadystatechange=respondercalendariomedico;

}
function respondercalendariomedico(){

  if (objetoAjax.readyState == 4){
        if (objetoAjax.status == 200) {
            eliminarespecialidadesmedicos();
            //alert(objetoAjax.responseText);
            var aux = objetoAjax.responseText;
            var obj_json = JSON.parse(aux);
            var article = document.getElementById("article");
            var section=document.createElement("section");
            article.appendChild(section);
            section.setAttribute("id","dias");
            var divcalendar=document.createElement("div");
            divcalendar.setAttribute("id","datepicker");

            section.appendChild(divcalendar);
           // alert(obj_json[0]);


          $("#datepicker").datepicker({ minDate: 1 ,    beforeShowDay: function(date){
        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [ obj_json.indexOf(string) != -1 ]
    }});


      

        }        
    }



}
function eliminarespecialidadesmedicos(){


     var section=document.getElementById("medicos");
    if(section !== null){
     var padre = section.parentNode;
      padre.removeChild(section);}
       var section2=document.getElementById("especialidades");
    if(section2 !== null){
     var padre2 = section2.parentNode;
      padre2.removeChild(section2);
       }}

function mostrarmedico(id,nombre,apellidos,foto){
var article=document.getElementById("article");
var section=document.createElement("section");
var button=document.createElement("button");
            var texto = document.createTextNode(nombre+" "+apellidos);
          
            var p1=document.createElement("p");
            p1.appendChild(texto);
            var textoboton=document.createTextNode("Aceptar");
            var img=document.createElement("img");
            var br = document.createElement("br");
            img.setAttribute("src",foto);
            img.setAttribute("class","fotoselec");
            button.appendChild(textoboton);
            button.setAttribute("class", "btn btn-primary");
           
           

            var div=document.createElement("div");
            div.setAttribute("class","cardmedicoselec")
            div.appendChild(p1);
            div.appendChild(img);
            div.appendChild(br);
            div.appendChild(button);
            
            
            
            section.appendChild(div);
            article.appendChild(section);
            section.setAttribute("class","enlinea mt-5")



}
function borrarinicio(){var section=document.getElementById("inicio");
    if(section !== null){
     var padre = section.parentNode;
      padre.removeChild(section);}


}

