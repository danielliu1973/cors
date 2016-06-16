# CORS

For Expressjs on node.js:
```
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
```
For IIS, Add this to web.config file:
```
<httpProtocol>
  <customHeaders>
    <add name="Access-Control-Allow-Origin" value="*" />
    <add name="Access-Control-Allow-Methods" value="GET, PUT, POST, DELETE, HEAD, OPTIONS" />
    <add name="Access-Control-Allow-Credentials" value="true"/>
    <add name="Access-Control-Allow-Headers" value="X-Requested-With, origin, content-type, accept" />
  </customHeaders>
</httpProtocol>
```
Reference:
* http://www.html5rocks.com/en/tutorials/cors/