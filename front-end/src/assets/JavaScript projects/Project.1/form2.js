let Formvalidetion=()=>{

    let Name=document.querySelector("#name").value.trim()
    let Lastname=document.querySelector("#lastname").value.trim()
    let Name2=document.querySelector("#name2").value.trim()
    let Lastname2=document.querySelector("#lastname2").value.trim()
    let Dob=document.querySelector("#dob").value.trim()
    let Number=document.querySelector("#num").value.trim()
    let Email=document.querySelector("#email").value.trim()
    let Password=document.querySelector("#pass").value.trim()
    let Confirm=document.querySelector("#cpass").value.trim()

    let tagname=document.querySelector("#name")
    let taglast=document.querySelector("#lastname")
    let tagname2=document.querySelector("#name2")
    let taglast2=document.querySelector("#lastname2")
    let tagdob=document.querySelector("#dob")
    let tagnum=document.querySelector("#num")
    let tagemail=document.querySelector("#email")
    let tagpass=document.querySelector("#pass")
    let tagcpass=document.querySelector("#cpass")


    let Errorname=document.querySelector("#errname")
   let Errorlastname=document.querySelector("#errlastname")
   let Errorbirth=document.querySelector("#errdob")
   let Errornumber=document.querySelector("#errnum")
   let Erroremail=document.querySelector("#erremail")
   let Errorpass=document.querySelector("#errpass")
   let Errorcpass=document.querySelector("#errcpass")

   Errorname.innerHTML=""
   Errorlastname.innerHTML=""
   Errorbirth.innerHTML=""
   Errornumber.innerHTML=""
   Erroremail.innerHTML=""
   Errorpass.innerHTML=""
   Errorcpass.innerHTML=""

let time= new Date()
let date=time.toLocaleDateString()


   if(Name==""){
    Errorname.innerHTML="Please Enter Name"
    Errorname.style.color="red"

    tagname.focus()
    return false
   }
   else if(Lastname==""){
      Errorname.innerHTML="Please Enter LastName"
      Errorname.style.color="red"
      taglast.focus()
      return false
   }
   else if(Name2==""){
        Errorlastname.innerHTML="Please Enter Name"
        Errorlastname.style.color="red"
         tagname2.focus()
        return false
   }
   else if(Lastname2==""){
        Errorlastname.innerHTML="Please Enter LastName"
        Errorlastname.style.color="red"
         taglast2.focus()
        return false
   }
   else if(Lastname2!=Lastname){
        Errorlastname.innerHTML="Please Enter Right LastName"
        Errorlastname.style.color="red"
         taglast2.focus()
       

        return false
   }
   else if(Dob==""){
       Errorbirth.innerHTML="Please Enter Birth"
       Errorbirth.style.color="red"
       tagdob.focus()
       return false
   }
   else if(Number==""){
     Errornumber.innerHTML="Please Enter Number"
     Errornumber.style.color="red"
     tagnum.focus()
     return false
   }
   else if(Number.length!=10){
     Errornumber.innerHTML="Please Enter valid Number"
     Errornumber.style.color="red"
     tagnum.focus()
     return false
   }
   else if(isNaN(Number)){
     Errornumber.innerHTML="Please Enter valid Number"
     Errornumber.style.color="red"
     tagnum.focus()

     return false
   }
   else if(Email==""){
     Erroremail.innerHTML="Please Enter Email "
     Erroremail.style.color="red"
     tagemail.focus()
     return false
   }
   else if(!(Email.includes("@") && Email.includes(".com"))){
     Erroremail.innerHTML="Please Enter valid Email "
     Erroremail.style.color="red"
     tagemail.focus()

     return false
   }

   else if(Password==""){
     Errorpass.innerHTML="Please Enter Password"
     Errorpass.style.color="red"
     tagpass.focus()
     return false
   }
   else if(!(Password.match(/[@$#*!]/) && Password.match(/[1234567890]/) && Password.match(/[A-Z]/))){
     Errorpass.innerHTML="Please Enter Strong Password"
     Errorpass.style.color="red"
     tagpass.focus()

     return false
   }

   else if(Confirm==""){
     Errorcpass.innerHTML="Please Enter Password"
     Errorcpass.style.color="red"
     tagcpass.focus()
     return false
   }
   else if(Confirm!=Password){
     Errorcpass.innerHTML="Not Matched"
     Errorcpass.style.color="red"
     tagcpass.focus()
     return false
   }

    

  


}