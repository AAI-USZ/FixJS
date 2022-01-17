function(err, listado){
                          if(err){
                            console.log("err "+err);
                          }
                          console.log("listado "+listado.length);
                          res.render("users/games.ejs",{
                            username: req.params.username,
                            partidas: listado,
                            layout:true, title:"AI Challenge - Bomberbot - Listado de partidas"
                          });
                          //res.send(listado);
                     }