  
  let Formvalidetion=()=>{

   let  Name =document.querySelector("#name").value.trim()
   let  Lastname =document.querySelector("#lastname").value.trim()
   let  Fathername =document.querySelector("#fathername").value.trim()
   let  Lastname2 =document.querySelector("#lastname2").value.trim()
   let  Birth=document.querySelector("#birth").value.trim()
   let  Number=document.querySelector("#num").value.trim()
   let  Email=document.querySelector("#email").value.trim()
   let  Pass=document.querySelector("#Pass").value.trim()
   let  Cpass=document.querySelector("#Cpass").value.trim()
    
   
   
    

   let Errorname=document.querySelector("#errname")
   let Errorlastname=document.querySelector("#errlastname")
   let Errorfathername=document.querySelector("#errfathername")
   let Errorlastname2=document.querySelector("#errlastname2")
   let Errorbirth=document.querySelector("#errbirth")
   let Errornumber=document.querySelector("#errnum")
   let Erroremail=document.querySelector("#erremail")
   let Errorpass=document.querySelector("#errpass")
   let Errorcpass=document.querySelector("#errcpass")
  




   if(Name==""){

         Errorname.innerHTML="Please Enter Name"
         Errorname.style.color="red"

         return false

   }
   else if(Lastname==""){

    Errorlastname.innerHTML="Please Enter Lastname"
     Errorlastname.style.color="red"
     return false
   }
   else if(Fathername==""){

    Errorfathername.innerHTML="Please Enter Fathersname"
     Errorfathername.style.color="red"
     return false
   }
   else if(Lastname2==""){

         Errorlastname2.innerHTML="PLease Enter Lastname"
         Errorlastname2.style.color="red"
         return false
   }
   else if(Lastname2!=Lastname){

         Errorlastname2.innerHTML="PLease Enter  Right Lastname"
         Errorlastname2.style.color="red"
         return false

   } 
   
   else if(Birth==""){

         Errorbirth.innerHTML="PLease Enter Birth Date"
         Errorbirth.style.color="red"
         return false
   }

   else if(Number==""){

         Errornumber.innerHTML="PLease Enter Number"
         Errornumber.style.color="red"
         return false
   }
   else if(Number.length!=10){

         Errornumber.innerHTML="PLease Enter Valid Number"
         Errornumber.style.color="red"
         return false
   }
   else if(isNaN(Number)){

         Errornumber.innerHTML="PLease Enter Valid Number"
         Errornumber.style.color="red"
         return false
   }

   else if(Email==""){
      Erroremail.innerHTML="Please Enter Email" 
      return false

   }

   else if (!(Email.includes("@") && Email.includes(".com"))){


      Erroremail.innerHTML="Please Enter Valid Email"
      Erroremail.style.color="red"
      return false
      
   }
   
   else if(Pass==""){

       Errorpass.innerHTML="Please Enter Password"
       Errorpass.style.color="red"
       return false

   }
   
   else if(!(Pass.match(/[!@#&*]/) && Pass.match(/[A-Z]/))){

       Errorpass.innerHTML="Please Enter strong Password"
       Errorpass.style.color="red"
       return false

   }
   else if(Pass!=Cpass){

      Errorcpass.innerHTML="Please Enter Right Password "
       Errorcpass.style.color="red"
       return false

   }

  
   



  
  


   
  




}