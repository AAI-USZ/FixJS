function(headers){
    var text, lines, line, i, name, value, cmd, header_lines = {};
    // unfold
    headers = headers.replace(/(\r?\n|\r)([ \t])/gm," ");

    // split lines
    lines = headers.split(/(\r?\n|\r)/);
    for(i=0; i<lines.length;i++){
        if(!lines[i]) // no more header lines
            break;
        cmd = lines[i].match(/[^\:]+/);
        if(cmd && (cmd = cmd[0])){
            name = cmd;
            value = lines[i].substr(name.length+1);
            if(!header_lines[name.toLowerCase().trim()])header_lines[name.toLowerCase().trim()] = [];
            header_lines[name.toLowerCase()].push(value.trim());
        }
    }
    
    return header_lines;
}