const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define path for Express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handle bar engine view and locations
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Set up static public directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Vikrant'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Vikrant'
    })
})


app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Vikrant',
        msg: 'This is some help text'
    })
})

app.get('/weather',(req, res)=>{

    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
        })
    })

   

    
})


app.get('/products',(req,res)=>{

    if(!req.query.search){
       return res.send('You must provide a search term')
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
        
})
//app.com
//app.com/help
//app.com/about

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        errorMsg: 'Help articke not found',
        name: 'Vikrant',
        title: 'Error'
    })
})

app.get('*',(req,res)=>{
    res.render('error404',{
        errorMsg: 'Page not found',
        name: 'Vikrant',
        title: '404',
    })
})

app.listen(3000, ()=>{
    console.log('Express server started on port 3000')
})