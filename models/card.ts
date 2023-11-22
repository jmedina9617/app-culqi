const Joi = require('joi');
const Luhn = require('luhn-js');

const schema = Joi.object({
    id: Joi.string()
            .uuid(),

    card_number: Joi.string()
                    .custom((value, helper) => {
                        var validateCard = Luhn.isValid(value);
                        if (value.length >= 13 && value.length <= 16) {
                            if (!validateCard) {
                                return helper.message("Número de tarjeta no válido")
                            }
                            return true;
                        }else{
                            return helper.message("card_number: Debe tener entre 13 a 16 caracteres")
                        }
                        
                    }),
    
    cvv: Joi.string()
            .min(3)
            .max(4)
            .messages({
                'string.min': `"cvv" debe tener un mínimo de {#limit} caracteres`,
                'string.max': `"cvv" debe tener un máximo de {#limit} caracteres`
            }),

    expiration_month: Joi.string()
                        .pattern(new RegExp('^(0[1-9]|[1-9]|1[012])$'))
                        .messages({
                            'string.base': `"expiration_month" debe cumplir con formato. Ejemplo: 1, 02, 11`,
                            'string.pattern.base': `"expiration_month" debe cumplir con formato. Ejemplo: 1, 02, 11`,
                        }),

    expiration_year: Joi.string()
                        .custom((value, helper) => {

                            var currentYear = new Date().getFullYear();
                            var validate = parseInt(value) - currentYear;

                            if (value.length == 4) {
                                if(value < currentYear){
                                    return helper.message("Año no debe ser menor a actual")
                                }
                                else if (validate > 5) {
                                    return helper.message("Año no debe ser mayor a 5 años del actual")
                                }
                                return true
                            }else{
                                return helper.message("expiration_year: Debe cumplir con formato. Ejemplo: 2023")
                            }
                                                        
                        }),

    email: Joi.string()
                .min(5)
                .max(100)
                .pattern(new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/))
                .messages({
                    'string.base': `"email" no cumple formato de correo`,
                    'string.pattern.base': `"email" no cumple formato de correo`,
                })

});

module.exports = schema;