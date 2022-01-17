function(msg) {
                switch (msg.cmd) {
                    case 'log':
                        ws.send(JSON.stringify({cmd:'post', p: msg.p}));
                    break;
                }
            }