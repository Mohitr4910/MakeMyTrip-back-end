let Signup=()=>{

    let Name=document.querySelector("#name").value.trim()
    let Email=document.querySelector("#email").value.trim()
    let Password=document.querySelector("#pass").value.trim()
    let Confirm=document.querySelector("#cpass").value.trim()

    let tagname=document.querySelector("#name")
    let tagemail=document.querySelector("#email")
    let tagpassword=document.querySelector("#pass")
    let tagconfirm=document.querySelector("#cpass")

    let Errname=document.querySelector("#errname")
    let Erremail=document.querySelector("#erremail")
    let Errpass=document.querySelector("#errpass")
    let Errcpass=document.querySelector("#errcpass")
    
    Errname.innerHTML=""
    Erremail.innerHTML=""
    Errpass.innerHTML=""
    Errcpass.innerHTML=""


    if(Name==""){

        Errname.innerHTML="Please Enter Name"
        Errname.style.color="red"
        tagname.focus()
        return false
    }
    else if(Email==""){
        Erremail.innerHTML="Please Enter Email"
        Erremail.style.color="red"
        tagemail.focus()
        return false

    }
    else if(!(Email.includes("@") && Email.includes(".com"))){
        Erremail.innerHTML="Please Enter Valid Email"
        Erremail.style.color="red"
        tagemail.focus()
        return false

    }
    else if(Password==""){
        Errpass.innerHTML="Please Enter Password"
        Errpass.style.color="red"
        tagpassword.focus()
        return false
    }
    else if(!(Password.match(/[@#$*!]/)&& Password.match(/[A-Z]/) || Password.match(/[a-z]/) && Password.match(/[1234567890]/))){
        Errpass.innerHTML="Please Enter Strong Password"
        Errpass.style.color="red"
        tagpassword.focus()
        return false
    }
    else if(Confirm==""){
        Errcpass.innerHTML="Please Enter Password"
        Errcpass.style.color="red"
        tagconfirm.focus()
        return false
    }
    else if(Confirm!=Password){
        Errcpass.innerHTML="Passwords do not match!"
        Errcpass.style.color="red"
        tagconfirm.focus()
        return false
    }
    
    
   let storagename= localStorage.setItem("Name",Name)
    localStorage.setItem("Email id",Email)
    localStorage.setItem("Password",Password)

    location.href="Login.html"
    return false
    
}

let Login=()=>{

    Loginemail=document.querySelector("#loginemail").value.trim()
    LoginPass=document.querySelector("#loginpass").value.trim()

    erroremail=document.querySelector("#err-loginemail")
    errorpass=document.querySelector("#err-loginpass")

   let Localemail=localStorage.getItem("Email id")
    let Localpass=localStorage.getItem("Password")

    if (Loginemail==""){
        erroremail.innerHTML="Enter email"
        erroremail.style.color="red"
        return false

    }
    else if(Loginemail!=Localemail){
         erroremail.innerHTML="Enter correct email"
        erroremail.style.color="red"
        return false

    }
    else if(LoginPass==""){
         errorpass.innerHTML="Enter Password"
        errorpass.style.color="red"
        return false

    }

    else if(LoginPass!=Localpass){
         errorpass.innerHTML="Enter correct Password"
        errorpass.style.color="red"
        return false

    }
    
    location.href="index.html"
    return false
   

}

let Movetosignup=()=>{
    location.href="SignUp.html"
    return false

}
let Booking=()=>{

    let bookflight=document.querySelector("#mohit")

    bookflight.style.display="block"

    bookflight.scrollIntoView({behavior:"smooth", block:"center"}) //you click a bookflight button then automatically move to booking field 

}

let showflight=()=>{
    location.href="show-flight.html"
    return false

}



