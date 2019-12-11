var exec = require('child_process').exec;

var machine = process.argv.slice(2);


var http = require('http');

var code = "";

function join_worker(name){ 
var request = http.get("http://192.168.19.147:5555/swarm", function(response){
 //console.log(response.statusCode);

  var body = "";

  response.on('data', function(chunk){
  	body += chunk;
  });

  response.on('end', function(){
  	if (response.statusCode === 200 ){ 
  		try{
		  	var manager_swarm = JSON.parse(body);
		  	code = (manager_swarm.JoinTokens.Worker);
        console.log(code);
        exec(`docker-machine ssh ${name}`+ ` "docker swarm join --token`+` ${code} `+`192.168.19.147:2377"`, (err, stdout, stderr) => {  
			  if (err) {  
			    console.error(err);  
			    return;  
			  }  
			  console.log(stdout);
			});
         }catch(error) {
         	console.error(error.message);
         }

    }else{
    	printError({message: "Impossible de récupérer les données"});
    }
  });
});
request.on('error', printError);

function printError(error){
  console.error(error.message);
 }
  
}

machine.forEach(function(name){
	join_worker(name);
});