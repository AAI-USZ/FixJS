function (protocol, port) { 
          if (protocol === 'tcp'){
            tcpServer.writeFile(logpath);
          }
          else if (protocol === 'http'){
            httpServer.writeFile(logpath, port);
          }
          else if (protocol === 'udp'){
            udpServer.writeFile(logpath);
          }
        }