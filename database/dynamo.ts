const AWS = require('aws-sdk');
const _dotenv = require("dotenv");
const result = _dotenv.config().parsed;

AWS.config.update({
	region: result.AWS_DEFAULT_REGION,
	accessKeyId: result.AWS_ACCESS_KEY_ID,
	secretAccessKey: result.AWS_SECRET_ACCESS_KEY,
});

const DocumentClient = new AWS.DynamoDB.DocumentClient();

const insertItem = async (TABLE_NAME, itemObject) => {

	const params = {
		TableName: TABLE_NAME,
		Item: itemObject,
	};
    
	return await DocumentClient.put(params).promise();

};

const getCardbyToken = async(TABLE_NAME, _token) => {

    const params = {
		TableName: TABLE_NAME,
		Key: {
			token: _token,
		},
	};
	return await DocumentClient.get(params).promise();

};

module.exports = {
	insertItem,
    getCardbyToken
};