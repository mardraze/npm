#!/usr/bin/node
var shell = require('shelljs');
if(!shell.which('git')){
    shell.echo('git command is not found');
    process.exit(1);
}
if(process.argv.length > 2){
    switch(process.argv[2]){
        case "angular":
            shell.exec('git clone https://github.com/mardraze/angular .');
    }
}
