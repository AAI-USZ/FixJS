function(info) {
                        
                        if(!info['_OK']){
                            console.log('mpdc not ok: ' + util.inspect(info));
                            ircclient.say(sendto, "mpd error :(");
                            return;
                        }
                        var premium  = /http.*\?[0-9a-f]*/g;
                        var filename = info['file'].replace(premium, "premiumstream");
                        var artist   = info['Artist'] ? info['Artist'] + " - " : "";
                        var message  =   "now playing: " + 
                                        artist + info['Title'] + 
                                        '(' + filename + ')';
                        if( !info['Artist'] && !info['Title']){
                            message  = "now playing: " + filename;
                        }
                        ircclient.say(sendto, message);
                    }