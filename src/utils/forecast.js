request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0fbbb2062f0ca025a6dc52a5998374dd/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    console.log(url)
    request( {
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to access Weather API', undefined)
        } else if (body.error) {
            callback('Unable to get weather with provided location', undefined)
        } else {
            const summary = body.hourly.summary
            const temp = body.currently.temperature
            const percPrecip = body.currently.precipProbability
            const tempHigh = body.daily.data[0].temperatureHigh
            const tempLow = body.daily.data[0].temperatureLow
            callback(undefined, summary + ' Todays High is: ' + tempHigh + ' and Todays Low is: ' + tempLow + '. It is currently ' + temp + ' degrees out. There is a ' + percPrecip + '% chance of rain.')
        }
        
    })
}

module.exports = forecast