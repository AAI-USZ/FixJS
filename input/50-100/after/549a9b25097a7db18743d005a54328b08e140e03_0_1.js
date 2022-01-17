function(err,data){
                          
                          if (error !== null) {
                            console.log('exec error: ' + error);
                            res.send({
                              error : error
                            });
                          } else {
                            res.send({
                              url : config.publicUrl+"/"+imgName
                            });
                            console.log("response sent, "+config.publicUrl+"/"+imgName);
                            cbSvg&&cbSvg(svg.toString(),config.publicUrl+"/"+imgName);
                          }
                      }