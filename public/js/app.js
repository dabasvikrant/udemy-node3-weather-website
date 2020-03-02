
 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageone = document.querySelector('#message-1')

const messagetwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messagetwo.textContent='loading'

    fetch('/weather?address=' + location).then((response)=>{

        response.json().then((data)=>{
            messagetwo.textContent=''
            if(data.error){
                messageone.textContent=data.error

            }else{
                messageone.textContent= data.location
                messagetwo.textContent= data.forecast.summary
            }
        })
    })
    
})