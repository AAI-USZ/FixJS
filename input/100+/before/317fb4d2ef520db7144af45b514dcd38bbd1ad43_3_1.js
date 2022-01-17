function(sessionToken,interpreter){
                var conf = interpreter.start();

                responseHeaders.set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, 0);
                responseBody.write(toBytes({
                    sessionToken : sessionToken,
                    nextConfiguration : conf 
                }));

                responseBody.close();

                //timeouts[sessionToken] = setTimeout(function(){cleanUp(sessionToken);},timeoutMs);  
            }