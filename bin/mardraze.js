#!/usr/bin/node
var shell = require('shelljs');
var fs = require('fs');
var chalk = require('chalk');
if(!shell.which('git')){
    console.error('git command is not found');
    process.exit(1);
}

var commands = {
    angular: function(command, dir){
        if(command === 'setup'){
            if (dir){
                var exists = fs.existsSync(dir);
                var isEmpty = true;
                if(exists){
                    isEmpty = shell.ls(dir).length === 0;
                }
                if(isEmpty){
                    shell.exec('git clone https://github.com/mardraze/angular '+dir);
                    shell.rm('-rf', dir+'/.git');
                    shell.rm('-rf', dir+'/nbproject');
                    console.log([
                        chalk.green('SUCCESS!'),
                        'Angular project has been created in "'+dir+'" directory',
                        '',
                        'What next?',
                        '',
                        chalk.green('cd '+dir+' && npm install && grunt'),
                        '',
                        'See files generated in "out" directory',
                        '',
                        'Try also:',
                        chalk.green('grunt watch'),
                        chalk.green('grunt dist')
                    ].join("\n"));
                    return true;
                }else{
                    if(exists){
                        console.log(chalk.magenta('directory in not empty'));
                    }
                }
            }else{
                console.log(chalk.magenta('directory in required'));
            }
        }else{
            console.log(chalk.magenta('Usage mardraze angular setup [directory]'));
        }
    }
};

var showHelp = function(){
    var possibleCommands = Object.keys(commands);
    console.log('Usage: mardraze [command]');
    console.log('Possible commands: '+possibleCommands.join(', '));
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
        console.error(chalk.magenta('Unknown command "'+command+'"'));
        showHelp();
    }
}else{
    showHelp();
}
process.exit(1);
