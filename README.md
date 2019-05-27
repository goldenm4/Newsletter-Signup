# Newsletter-Signup
Bootstrap -> Mailchimp Signup

Simple signup page for mailchimp newsletters

Run locally with the following steps:
1. download/fetch files (html, css, js, and json; png can be your own)
2. npm install the dependencies (body-parser, dotenv, express and request; or see package.json)
3. create .env file and add your mailchimp credentials:
  3.a DC=your data center (which is at the end of your API_Key; e.g. us10)
  3.b AUDIENCE_ID=the Audience_ID mailchimp assigned to your audience (previously list_id; e.g. c876i87efg)
  3.c AUTHORIZATION_ID=this can be any string you want (e.g. SampleID)
  3.d API_KEY=the API_KEY mailchimp assigned you (e.g. 3497gbaiurbva9834qobvre7w-us10)

4. select your port (default in this code is set to 3000; i.e. const port = 3000;)
5. use terminal to spin up your server (e.g. nodemon app.js)
6. open your server in your browser (e.g. localhost:3000)
