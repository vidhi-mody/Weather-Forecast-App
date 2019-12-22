const request = require('request')

const forecast = (latitude,longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/e20483366d1ec85f6ca9a12f4d50ce59/'+latitude+','+longitude+'?units=si'
    request({url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service! Check if you have a stable internet connection and try again later!',undefined)
        }
        else if(body.error){
            callback('Unable to find location. Try another search',undefined)
        } else{
            callback(undefined,body.daily.data[0].summary+' It is currently ' + body.currently.temperature + ' degree celcius outside. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}


module.exports = forecast