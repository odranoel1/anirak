module.exports = {
    apiURL: process.env.NODE_ENV === 'none' ? 'http://localhost:3000/dev/api/v1' : 'https://3tpkvl68v9.execute-api.us-east-1.amazonaws.com/prod/api/v1'
};