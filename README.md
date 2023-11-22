
# app-culqi

Esta aplicación tokenizará los datos de la tarjeta y devolverá dicho token con el cual sera consultado posteriormente para obtener los datos de tarjeta.





## API Reference

#### Get token

```http
  GET /request/token
```
| Parameter | Description                |
| :-------- | :------------------------- |
| `x-api-key` | **Header** Your API key |

#### body
```javascript
{
    "card_number": "4111111111111111",
    "cvv": "1234",
    "expiration_month": "06",
    "expiration_year": "2028",
    "email": "user2@gmail.com"
}
```
#### response
```javascript
{
    "data": {
        "message": "Token generado. Registro exitoso",
        "token": "8f4zwCEc8hlM3Vtd"
    }
}
```


#### Get card

```http
  GET /request/card
```
| Parameter | Description                |
| :-------- | :------------------------- |
| `x-api-key` | **Header** Your API key |

#### body
```javascript
{   
    "token": "mswnfGlFMtaoi3DL"
}
```
#### response
```javascript
{
    "CardData": {
        "card_number": "4111111111111111",
        "expiration_month": "06",
        "expiration_year": "2028",
        "email": "user2@gmail.com"
    }
}
```


## Comandos

**npm run build:** Compilará typescript

**npm start:** Iniciará en local app

## Consideraciones

El archivo .env guarda 4 llaves. Estas se trabajaron al levantar app con AWS online. Para el mismo debe existir la tabla "cards" en dynamoDB, ya que se trabajó con dicha BD

**AWS_DEFAULT_REGION**

**AWS_ACCESS_KEY_ID**

**AWS_SECRET_ACCESS_KEY**

**API_KEY**

