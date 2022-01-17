function(e) { // receive commands
                try {
                    var cmds = JSON.parse(e.data);
                    for (var i = 0; i < cmds.length; i++) {
                        // forward command to extension
                        dbg('received command', cmds[i]);                        
                        __p.postMessage(cmds[i]);
                    }
                } catch(e) {}
            }