const express = require('express');
const app = express();
const utils = require('./utils/general.ts');
const bodyParser = require('body-parser');
const schemaCard = require('./models/card.ts');
const dynamoDB = require('./database/dynamo.ts')
const dotenv = require("dotenv");
const envResult = dotenv.config().parsed;

const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/request/token', (req, res)=>{

    var pk = req.header("x-api-key") || envResult.API_KEY;

    if (pk !== (undefined || '')) {

        var CardObject = {
            card_number: req.body.card_number,
            cvv: req.body.cvv,
            expiration_month: req.body.expiration_month,
            expiration_year: req.body.expiration_year,
            email: req.body.email
        };
    
        const result = schemaCard.validate(CardObject);
    
        if (result.error !== undefined) {
            if (result.error.details.length > 0) {
                return res.json({error: result.error.message})
            }
        }
    
        var token = utils.generarToken(CardObject);
    
        res.json({
            data: {
                message: "Token generado. Registro exitoso",
                token: token
            }
        });

    }else{
        res.json({error: "No se ha proporcionado header api key"})
    }

    

})

app.get('/request/card', (req, res) => {

    var pk = req.header("x-api-key") || envResult.API_KEY;

    if (pk !== (undefined || '')) {

        var obj = {
            token: req.body.token
        }
    
        dynamoDB.getCardbyToken('cards', obj.token)
        .then((data) => {
            
            if (data.Item == undefined) {
                return res.json({error: "No se encontro data"})
            }

            var objCard = {
                card_number:        data.Item.card_number,
                expiration_month:   data.Item.expiration_month,
                expiration_year:    data.Item.expiration_year,
                email:              data.Item.email
            }

            var expireToken = utils.validateTime(data.Item.timestamp);

            if (expireToken) {
                return res.json({error: "Token expirado"})
            }

            res.json({CardData: objCard});
    
        }).catch((err) => {
            console.log(err)
        })

    }else{
        res.json({error: "No se ha proporcionado header api key"})
    }

})

app.listen(port, () =>{
    console.log('Escuchando puerto: ', port);
})
