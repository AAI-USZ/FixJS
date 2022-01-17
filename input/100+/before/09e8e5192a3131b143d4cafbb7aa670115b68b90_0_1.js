function(info) {
                        
                        if(!info['_OK']){
                            console.log('mpdc not ok: ' + util.inspect(info));
                            ircclient.say(sendto, "mpd error :(");
                            return;
                        }
                        var premium  = /http.*\?[0-9a-f]*/g;
                        var filename = info['file'].replace(premium, "premiumstream");
                        var message  =   "NP: " + 
                                        info['Artist'] + ' - ' + info['Title'] + 
                                        '(' + filename + ')';
                        ircclient.say(sendto, message);
                    }