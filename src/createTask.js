const {v4} = require("uuid")
const AWS = require("aws-sdk");

async function createTask(event) {
    try {
        const dynamoConnection = new AWS.DynamoDB.DocumentClient();
        const { title, description } = JSON.parse(event.body);
        const createdAt = new Date();
        const id = v4();
        const newTask = {
            id,
            title,
            description,
            createdAt
        }
        await dynamoConnection.put({
            TableName: "TaskTable",
            Item: newTask
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(newTask, null,3)
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: error.message
        }
    }
}

module.exports = {
    createTask
}