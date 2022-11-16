const AWS = require("aws-sdk");

module.exports = {
    getTasks: async () => {
        try {
            const dynamoConnection = new AWS.DynamoDB.DocumentClient();
            const dataTable = await dynamoConnection.scan({
                TableName: "TaskTable"
            }).promise();
            return {
                status: 200,
                body: {
                    tasks: dataTable.Items
                }
            }
        }catch (e) {
            return {
                status: 400,
                body: e.message || "Unhandled error at getTasks function."
            }
        }
    }
}