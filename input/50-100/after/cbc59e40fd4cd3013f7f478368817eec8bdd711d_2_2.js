function(err, listado){
                          if(err){
                            console.log("err "+err);
                          }
                          if(listado.length==0){
                            listado=undefined;
                          }
                          res.render("users/games.ejs",{
                            username: req.currentUser.get("username"),
                            partidas: listado,
                            layout:true, title:"AI Challenge - Bomberbot - Listado de partidas"
                          });
                     }