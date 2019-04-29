
var propForm = {
    entradas: document.querySelectorAll("input.validar"),
    valor: null,
    expresionRegular:null,
    validaciones: new Array()
    

}
var valForm = {
   
    valText:function(min,max,propVal,inpVal,menError,expresionRegular ){
       if(propVal.length < min || propVal.length > max || !expresionRegular.test(propVal) ){
           inpVal.innerHTML = '<span style="color:red">*Error al ingresar los datos: '+menError+'</span>';

           return false;

       }else{
           inpVal.parentNode.removeChild(inpVal);

          return true;

       }
      
    },
    //Método para validar expresiones regulares 
    valExpRegular:function(expresionRegular,propFormVal,inpVal,menError){
        
       if(!expresionRegular.test(propFormVal)){
           
           inpVal.innerHTML = '<span style="color:red">*Error al ingresar los datos: '+menError+'</span>';

           return  false;

       }else{
           inpVal.parentNode.removeChild(inpVal);

           return  true;
       }

    }
}
var metFormulario = {
   inicioFormulario: function(){
   
        
       for(var i = 0; i < propForm.entradas.length; i++){

           propForm.entradas[i].addEventListener("focus", metFormulario.inpFoco);
           propForm.entradas[i].addEventListener("blur", metFormulario.inpFueraFoco);  
           propForm.entradas[i].addEventListener("change", metFormulario.changeInput); 
           
       }   

   },
        inpFoco: function(input){
        propForm.valor = input.target.value;

        if(propForm.valor == ""){
                
             document.querySelector("[for="+input.target.id+"] .obligatorio").innerHTML='*Campo obligatorio'
             document.querySelector("[for="+input.target.id+"] .obligatorio").style.color = 'red';
        }
        document.querySelector("[for="+input.target.id+"]").appendChild(document.createElement("DIV")).setAttribute("class","error")
    },


        inpFueraFoco: function(input){
            document.querySelector("[for="+input.target.id+"] .obligatorio").style.display = 'none';
    
        },
    
    changeInput: function(input){
        let validar= false;
        propForm.valor = input.target.value;
        var tipo = input.target.type;
        
        switch(tipo)
        {
                case "text":
                
                    if(propForm.valor != "")
                        {
                            propForm.expresionRegular = /^[a-zA-Z]+$/;
                            validar = valForm.valText(2,6,propForm.valor,document.querySelector("[for="+input.target.id+"] .error"),input.target.placeholder,propForm.expresionRegular);
                            propForm.validaciones["nombre"] = validar;
                        }
                    else{
                        document.querySelector("[for="+input.target.id+"] .error").parentNode.removeChild(document.querySelector("[for="+input.target.id+"] .error"))
                    }
                break;
                case "password":
                
                if(propForm.valor != "")
                        {
                            propForm.expresionRegular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
                            validar = valForm.valExpRegular(propForm.expresionRegular,propForm.valor,document.querySelector("[for="+input.target.id+"] .error"),input.target.placeholder)
                            propForm.validaciones["password"] = validar;
                            
                        
                            
                        }
                else{
                            document.querySelector("[for="+input.target.id+"] .error").parentNode.removeChild(document.querySelector("[for="+input.target.id+"] .error"))
                        }
                
                break;

                case "email":
                if(propForm.valor != "")
                    {
                        propForm.expresionRegular = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                        validar = valForm.valExpRegular(propForm.expresionRegular,propForm.valor,document.querySelector("[for="+input.target.id+"] .error"),input.target.placeholder)
                        propForm.validaciones["email"] = validar;
                    }
                else{
                        document.querySelector("[for="+input.target.id+"] .error").parentNode.removeChild(document.querySelector("[for="+input.target.id+"] .error"))
                    }
                    
            break;

                case "checkbox":
                    if(propForm.valor !='checked')
                    {
                        propForm.validar["checkbox"]=validar;
                    }
                     else{
                        document.querySelector("[for="+input.target.id+"] .error").parentNode.removeChild(document.querySelector("[for="+input.target.id+"] .error"))='NO SE PUDO'
                    }
                 break;
                 case 'submit' :
                     if () {
                         
                     }
                       

        }
        
        },
        validaTotal:function(arreglo){
            
            let resVal = false;
            for(var clave in arreglo) {
            if(arreglo[clave]== false)
            {
                resVal = true;
                return resVal;

            }

            }
            return resVal;

        },
        valFormCompleto:function(){
            var valida = propForm.validaciones;
            let resultValidacion = false;
            if (valida.length<=0) {
                resultValidacion = true;
            }
            else{
                resultValidacion = metFormulario.validaTotal(valida);
            }
            
            if(resultValidacion)
            {
                resultado.style.display = ''
                document.querySelector("#acept").innerHTML ='<span style="color:red">¡*Tiene errores en los datos que ha ingresado</span>';
                
            }
            else{
                

            }
        }
    
        
    }
        metFormulario.inicioFormulario();   



























