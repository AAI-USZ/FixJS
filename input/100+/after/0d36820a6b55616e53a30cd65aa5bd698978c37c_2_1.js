function(err,model){
                    if(err){
                        console.error(err);
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end(err.message);
                    }else{
                        var interpreter = new scion.SCXML(model);

                        var sessionToken = sessionCounter;
                        sessionCounter++;
                        sessions[sessionToken] = interpreter; 

                        var conf = interpreter.start(); 

                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            sessionToken : sessionToken,
                            nextConfiguration : conf
                        }));

                        timeouts[sessionToken] = setTimeout(function(){cleanUp(sessionToken);},timeoutMs);  
                    }
                }