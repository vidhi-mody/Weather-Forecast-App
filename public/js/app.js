console.log('Hi')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#id-1')
const messageTwo = document.querySelector('#id-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Fetching results...."

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = "Seached location: "+data.location
                messageTwo.textContent = data.forecast
            }
        })

    })

})