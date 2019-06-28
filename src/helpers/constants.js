// put the values which is constant over the app.

 export const appConstants = {
   WEB_SERVICE_URL: (process.env && process.env.REACT_APP_API_HOST) || "https://node-demo-api-test.herokuapp.com",
   // WEB_SERVICE_URL: 'https://2cdf2a80.ngrok.io',

  }
  