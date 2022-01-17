function(data) {
    //alert('Running '+data.cmd);
    return commands[data.cmd](data.args);
}