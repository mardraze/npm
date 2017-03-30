#!/usr/bin/node
var shell = require('shelljs');
if(!shell.which('git')){
    shell.echo('git command is not found');
    process.exit(1);
}

var commands = {
    angular: function(dir){
        if(!dir){
            dir = '.';
        }
        shell.exec('git clone https://github.com/mardraze/angular '+dir);
    }
};

var showHelp = function(){
    var possibleCommands = Object.keys(commands);
    shell.echo('Usage: mardraze [command]');
    shell.echo('Possible commands: '+possibleCommands.join(', '));
};

if(process.argv.length > 2){
    var command = process.argv[2];
    if(commands.hasOwnProperty(command)){
        var args = process.argv.slice(3);
        commands[command].apply(undefined, args);
    }else{
        shell.echo('Unknown command');
        showHelp();
    }
}else{
    showHelp();
}
