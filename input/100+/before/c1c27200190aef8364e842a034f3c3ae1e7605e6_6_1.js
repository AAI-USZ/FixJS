function(done){
            var game, added = false;
            var gameManager = Common.entity.GameManager.create(null,{
                statePath:Common.path.join( Common.paths.data, 'states', 'game_manager.json')
            });

            gameManager.on('add', function(game){
                added = true;
            });
            
            Step(
                function(){
                    gameManager.createGame( this );
                },
                function(err,result){
                    if(err) throw err;
                    assert( !result.isNew() );
                    assert( added );
                    assert.equal( gameManager.getGame(result.id).id, result.id );
                    done();
                }
            );
        }