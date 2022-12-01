let express = require('express')
let router = express.Router() //Maps url to functions that provides request

let stateData = require('./state_fact.json.json')

//This function is called when a request is made to the about url path
//And it returns a JSON
router.get('/about', function(req, res, next) {
    return res.json({
        'about': 'A state fact API to demonstrate some Express concepts'
    })
})

router.get('/state-list', function(req, res, next) {
    // Get all the property names from an object
    // array of all the keys from the object
    let stateNames = Object.keys(stateData)
    return res.json(stateNames)
})

// the :stateName matches the state url path like; /fact/Minnesota responds with a fact about Minnesota
// /fact/qwerty responds with 404 State Not Found
router.get('/fact/:stateName', function(req, res, next){
   // param matches the stateName to the url
    let stateName = req.params.stateName
    console.log('request made about' + stateName)
    let fact = stateData[stateName]
    // check if fact is a string or undefined
    // like if state name is Qwerty, or something that is not in the object
    if (fact) {
        res.json({
            name: stateName,
            fact: fact
        })
    } else {
        res.status(404).send('State not found')
    }

    /* To send an error to the error handlers
    next(Error('Oops')) // not in a callback/then/catch
    return next(Error('Oops'))  // from a callback/then/catch
    You'd obviously provide more useful info in the message.
    You may have an error object, for example, from Sequelize, that you can pass to the error handler.
    */
})

module.exports = router