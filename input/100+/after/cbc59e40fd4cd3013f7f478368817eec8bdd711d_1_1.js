function (err, found) {
      if(err){
          console.log("error "+err);
      }
      if(found==0){
        res.render('index',{layout:true,title: 'AI challenge - bomberbot by codetag.me', partidaCargada: undefined});
        return;
      }

      models.User.find({$or:[{_id:found[0].jugadorA},
                         {_id:found[0].jugadorB},
                         {_id:found[0].jugadorC},
                         {_id:found[0].jugadorD}]},
                         function(err, dbuser){
                                
                        res.render('index', {
                                      layout: true, 
                                      title: 'AI Challenge - Bomberbot', 
                                      partidaCargada: found[0].logPartida,
                                      jugadorA:found[0].jugadorA,
                                      jugadorB:found[0].jugadorB,
                                      jugadorC:found[0].jugadorC,
                                      jugadorD:found[0].jugadorD
                        });
            });

                                
        }