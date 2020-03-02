const request = require('request')


const forecast = (latitude,longitude,callback)=>{

    const geoPoint = latitude + ',' + longitude
    const url = 'https://api.darksky.net/forecast/1a0e80e1f9c7dbde5bffd29681c297a3/'+ geoPoint +'?units=si&lang=en'

    request({url,json:true},(error,{body})=>{

        if(error){
            callback('Unable to connect to weather services')
        }else if(body.error){
            callback('Unable to find location')
        }else{
            callback(undefined, {
                    summary: body.daily.data[0].summary,
                    temperature: body.currently.temperature,
                    precipProbability: body.currently.precipProbability
            })
        }

    })
}

module.exports = forecast