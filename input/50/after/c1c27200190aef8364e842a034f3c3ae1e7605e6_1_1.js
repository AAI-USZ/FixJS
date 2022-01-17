function(err,result){
            // print_ins( arguments );
            // log('finished saving game ' + )
            // res.json( {status:Common.Status.ACTIVE, game_id:game.id, game_count:app.gameManager.games.length} );
            self.games.add( game );
            // log( 'added game ' + game.id );
            callback( null, game );
        }