const randtoken = require('rand-token');
const dynamoDBGeneral = require('../database/dynamo.ts')
const uuid = require('node-uuid')

module.exports = {

    generarToken(objectCard){
       
        var _token = randtoken.generate(16);

        var objCard = {
            id:                 uuid.v1(),
            card_number:        objectCard.card_number,
            cvv:                objectCard.cvv,
            expiration_month:   objectCard.expiration_month,
            expiration_year:    objectCard.expiration_year,
            email:              objectCard.email,
            token:              _token,
            timestamp:          Date.now()
        }

        //save token and card data in BD
        dynamoDBGeneral.insertItem('cards', objCard)

        return _token;
    },

    validateTime(timestamp){

        var now = Date.now();

        if((now - timestamp) >= 15*60*1000){
            return true;
        }return false;

    }

}