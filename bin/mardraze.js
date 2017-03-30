#!/usr/bin/node
var shell = require('shelljs');
if(!shell.which('git')){
    shell.echo('git command is not found');
    process.exit(1);
}

var commands = {
    angular: function(attr1, attr2){
        //shell.exec('git clone https://github.com/mardraze/angular .');
        console.log(attr1, attr2);
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
        var args = process.argv.slice(2, process.argv.length-2);
        console.log(process.argv, args);
        commands[command].apply(undefined, args);
    }else{
        shell.echo('Unknown command');
        showHelp();
    }
}else{
    showHelp();
}
