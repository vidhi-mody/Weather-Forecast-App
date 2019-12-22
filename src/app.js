const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather Forecast'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Enter a valid address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (err,forecastData)=>{
            if(err){
                return res.send({err})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
        })
       
    })
 
        
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me'
    })
})


app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help Page'
    })
})

app.get('*',(req, res) => {
    res.render('404')
})

app.listen(3000, () => {
    console.log('Server is up and running')
})

