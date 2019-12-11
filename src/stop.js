'use strict';

import exec from 'child-process-promise';
import _ from 'lodash';

//var exec = require('child-process-promise').exec; 

module.exports = function eteindre(){ 
exec('docker-machine stop myvm1', (err, stdout, stderr) => {  
  if (err) {  
    console.error(err);  
    return;  
  }  
  console.log(stdout);  
});  
};

export default { eteindre }
