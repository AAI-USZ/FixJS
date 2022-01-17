function (socket) {
            var r_host = socket.remoteAddress;
            var r_port = socket.remotePort;
            var shell = repl.start("ks> ", socket, eval);
            _(shell.context).extend(context);
            log.info("REPL received connection from "+r_host+":"+r_port); 
            socket.on('close', function () {
                log.info("REPL connection closed for "+r_host+":"+r_port);
            });
        }