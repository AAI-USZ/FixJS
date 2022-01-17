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
                            console.log("cbSvg : ",cbSvg.toString());
                            cbSvg&&cbSvg(svg.toString());
                          }
                      }