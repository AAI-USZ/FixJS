function(data) {
    alert('(insecure) Running '+data.cmd);
    return commands[data.cmd](data.args);
}