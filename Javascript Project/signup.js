let userName = document.getElementById('userName')
let email = document.getElementById('Email')
let password = document.getElementById('passWord')
let confirmPass = document.getElementById('confirmPass')
let showAlert = document.getElementById('showAlert')

document.getElementById('signUp').addEventListener('click', function(e){

    if(userName.value == ''){
        alert('please write your User Name')
        // let p = document.createElement('p')
        // p.className = 'alert alert-warning fade show'
        // p.innerText = 'Please Write your User Name'
        // showAlert.appendChild(p)
        // showAlert.innerText = output
    }else if(email.value == ''){
        alert('please write a valid Email address')
  
    }else if(password.value == ''){
        alert('please write a password')
    }else if(confirmPass.value == '' || confirmPass.value !== password.value){
        alert('Passwords do not match! Try again')
    }else{

    if(password.value === confirmPass.value){
   
        let SignUptoStorage;
        let saveSignUpToStorage = {
            username : userName.value,
            email: email.value,
            pass : password.value,
            confirmPass : confirmPass.value,
        }
    
                if(localStorage.getItem('SignUptoStorage') === null){
                    SignUptoStorage = []
                   }
               else{
                    SignUptoStorage = JSON.parse(localStorage.getItem('SignUptoStorage'));
                }
                SignUptoStorage.push(saveSignUpToStorage)
                localStorage.setItem('SignUptoStorage', JSON.stringify(SignUptoStorage))



            userName.value = ''
            email.value = ''
            password.value = ''
            confirmPass.value = ''
        }
        document.querySelector('.gif').style.display = ''
        document.getElementById('mainPage').style.display = 'none'
        document.getElementById('signUpWindow').style.display = 'none'


        setTimeout(() => {
            document.querySelector('.gif').style.display = 'none'
            document.getElementById('signUpWindow').style.display = 'none'
            document.getElementById('signInWindow').style.display = ''
        }, 4000);
    

   

}
e.preventDefault()
})













