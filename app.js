const express=require("express");
const bodyParser = require("body-parser");
const request=require("request");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    var first=req.body.first;
    var last=req.body.last;
    var email=req.body.email;
    console.log(first);
    console.log(last);
    console.log(email);
    var data={
         Name:first+last,
         Email:email,
         CustomField: {
             Country:"India",
            }

    }
    var finaldata=JSON.stringify(data);
  var options={
    url:"https://api.moosend.com/v3/subscribers/17bbbb47-d2ed-4afd-b545-4e048f738e2b/subscribe.json?apikey=8281b470-4d29-4dd7-99df-4620e786e6cb",
    method:"POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:finaldata
    
};

request(options,function(error,response,body){
if(error){
    res.send("you are not successfully subscribed");
    res.sendFile(__dirname+"/failure.html");
}
else{
    console.log(response.statusCode);
    console.log(response.headers);
    console.log(body);
    if(response.statusCode==200)
    res.sendFile(__dirname+"/success.html");
    else
    res.sendFile(__dirname+"/failure.html");
}
});
});
app.post("/failue",function(){
  res.redirect("/");
});
app.listen(process.env.PORT||3000,function(){console.log("server is running on port 3000");});

//7597a706-40ca-42dc-85ce-ce72324c097d




//15a2fd80-1e8b-4e8b-8bc5-d87a66b7c7b0
