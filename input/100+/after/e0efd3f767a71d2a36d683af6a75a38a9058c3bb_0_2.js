function(l){

        // First of all, we test for a line that has nothing but white-spaces, which separates blocks of commands.
        var m = l.match(/^\s*$/);
        if(m !== null){
            return;
        }

        // Now we check if it's a valid panel command, which is easily the most complex in the system. It starts with an optional label followed by the character ']', followed by an optional list of space separated classes and, optionally, by a colon followed by optional space separated positioning instructions: x offset, y offset, origin point, destination point, and the character '[' followed by the label of a previous panel to be used as anchor.
        m = l.match(/^(?:(.*))?]([^:]*)?(?::(-?[0-9.]+)?(?: (-?[0-9.]+)(?: (-?[0-9.]+)(?: (-?[0-9.]+))?)?)?(?:\s*\[(.*))?)?$/);
        if(m !== null){
            return{
                type: 'panel',
                labl: m[1],
                clss: m[2] || '',
                posi: $.map(m.slice(3,7), function(n){
                    if(!isNaN(n)) return parseFloat(n, 10);
                }),
                ancr: m[7]
            };
        }

        // If it's not a panel, maybe it's an effect, which means it starts with a tilde, followed by the name of the effect followed by optional (space separated) arguments.
        m = l.match(/^~(\S*)\s+(.*)$/);
        if(m !== null){
            return{
                type: 'effect',
                command: m[1],
                arguments: m[2] && m[2].split(/\s+/)
            };
        }

        // Anything else is considered a chunk of text to be printed in the panel, optionally preceded by a space separated, comma terminated list of classes that apply to it.
        m = l.match(/^(?:([^:]*):)?(.*)$/);
        if(m !== null){
            return{
                type: 'chunk',
                clss: m[1] || '',
                text: m[2]
            };
        }
    }