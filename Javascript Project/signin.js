//Sign in Section
let signInEmail = document.querySelector('.signInEmail')
let signInPass  = document.querySelector('.signgInPass')
let showalertin = document.getElementById('showAlertin')

document.getElementById('signIn').addEventListener('click',function(e){

    if(signInEmail.value === ''){
        alert('wrong email')
    }else if(signInPass.value === ''){
        alert('wrong Password')
    }else if(localStorage.getItem('SignUptoStorage') == null){
        alert('please Sign up First')
    }else{

        let takeInfo = JSON.parse(localStorage.getItem('SignUptoStorage'))
        console.log(takeInfo)
        for(i=0;i<takeInfo.length;i++){
            if(takeInfo[i] == null){
                alert('please Sign up first')
            }else if(signInEmail.value == takeInfo[i].email && signInPass.value == takeInfo[i].pass){
              
                document.querySelector('.gif').style.display = ''
        
              

                setTimeout(() => {
                    document.querySelector('.gif').style.display = 'none'
                    window.location.replace('file:///home/omer/Desktop/Javascript%20Project/index.html')
                }, 4000);
                
              
            }else{
                alert('The user name or password is incorrect')
                
            }
        }
 
        
    }
    e.preventDefault()
})

