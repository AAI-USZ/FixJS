function()
{
    gotoLabels = {};
    whileLabels = { ends: {}, whiles: {} };
    forEachLabels = { forends: {}, fors: {} };  // mhb:20111107
    var command_rows = [];
    var numCommands = testCase.commands.length;
    for (var i = 0; i < numCommands; ++i) {
        var x = testCase.commands[i];
        command_rows.push(x);
    }
    var cycles = [];
    var forEachCmds = [];
    for( var i = 0; i < command_rows.length; i++ ) {
        if (command_rows[i].type == 'command')
        switch( command_rows[i].command.toLowerCase() ) {
            case "label":
                gotoLabels[ command_rows[i].target ] = i;
                break;
            case "while":
            case "endwhile":
                cycles.push( [command_rows[i].command.toLowerCase(), i] )
                break;
            case "storefor":
            case "endfor":
                forEachCmds.push( [command_rows[i].command.toLowerCase(), i] )
                break;
        }
    }  
    var i = 0;
    while( cycles.length ) {
        if( i >= cycles.length ) {
            throw new Error( "non-matching while/endWhile found" );
        }
        switch( cycles[i][0] ) {
            case "while":
                if( ( i+1 < cycles.length ) && ( "endwhile" == cycles[i+1][0] ) ) {
                    // pair found
                    whileLabels.ends[ cycles[i+1][1] ] = cycles[i][1];
                    whileLabels.whiles[ cycles[i][1] ] = cycles[i+1][1];
                    cycles.splice( i, 2 );
                    i = 0;
                } else ++i;
                break;
            case "endwhile":
                ++i;
                break;
        }
    }

/*  ---- mhb: 20111107 --- begin --- */
    var idxFE = 0;
    while( forEachCmds.length ) {
        if( idxFE >= forEachCmds.length ) {
            throw new Error( "non-matching storeFor/endFor found" );
        }
        switch( forEachCmds[idxFE][0] ) {
            case "storefor":
                if( ( idxFE+1 < forEachCmds.length ) && ("endfor" == forEachCmds[idxFE+1][0]) ) {
                    // pair found
                    forEachLabels.forends[ forEachCmds[idxFE+1][1] ] = forEachCmds[idxFE][1];
                    forEachLabels.fors[ forEachCmds[idxFE][1] ] = forEachCmds[idxFE+1][1];
                    forEachCmds.splice( idxFE, 2 );
                    idxFE = 0;
                } else ++idxFE;
                break;
            case "endfor":
                ++idxFE;
                break;
        }
    }

}