const AWS = require("aws-sdk");

module.exports.getSingleTask = async (event) => {
    try {
        const dynamoConnection = new AWS.DynamoDB.DocumentClient();
        const {id} = event.pathParameters
        const itemFound = await dynamoConnection.get({
            TableName: "TaskTable",
            Key: {
                id
            }
        }).promise();
        return {
            status: 200,
            body: itemFound
        }
    } catch (error) {
        return {
            status: 400,
            body: error.message || "Unhandled error at getSingleTask function."
        }
    }
}