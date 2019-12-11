var exec = require('child_process').exec; 

var machine = process.argv.slice(2);


function printMe(name){ 
exec(`docker-machine ssh ${name} "docker swarm leave --force"`, (err, stdout, stderr) => {  
  if (err) {  
    console.error(err);  
    return;  
  }  
  console.log(stdout);
});  
}

machine.forEach(function(name){
	printMe(name);
});