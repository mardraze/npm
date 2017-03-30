#!/usr/bin/node
var shell = require('shelljs');
var fs = require('fs');

if(!shell.which('git')){
    shell.echo('git command is not found');
    process.exit(1);
}

var commands = {
    angular: function(dir){
        if(!dir){
            dir = 'mardraze-angular';
        }
        if (!fs.existsSync(dir)) {
            shell.exec('git clone https://github.com/mardraze/angular '+dir);
            shell.echo('Angular project has been created in "'+dir+'" directory');
            shell.echo('What next?');
            shell.echo('npm install - install depedencies');
            shell.echo('grunt - build code for debugging');
            shell.echo('grunt watch - watch file events, compile the code when file has been changed');
            shell.echo('grunt dist - minimalize the code');
            shell.echo('Output files has been created defautly in "out" directory');
            return true;
        }else{
            shell.echo('Directory "'+dir+'" is not empty');
        }
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
        var success = commands[command].apply(undefined, args);
        if(success){
            process.exit(0);
        }
    }else{
        shell.echo('Unknown command');
        showHelp();
    }
}else{
    showHelp();
}
process.exit(1);
