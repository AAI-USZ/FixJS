function (protocol) { 
          if (protocol === 'tcp'){
            tcpServer.writeFile(logpath);
          }
          else if (protocol === 'http'){
            httpServer.writeFile(logpath);
          }
          else if (protocol === 'udp'){
            udpServer.writeFile(logpath);
          }
        }