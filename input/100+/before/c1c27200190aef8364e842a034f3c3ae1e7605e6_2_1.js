function(options,callback){
    if( _.isFunction(options) ){
        callback = options;
    }
    options = (options || {});
    
    // boot the game manager
    var gameManager = exports.gameManager = Common.entity.GameManager.create(null,{
        statePath:Common.path.join( Common.paths.data, 'states', 'game_manager.json')
    });

    Step(
        function(){
            gameManager.fetchRelatedCB( this );        
        },
        function(err,result){
            if( err ){
                // log(err);
                // doesn't exist - go for saving instead
                gameManager.saveCB(this);
            }else{
                this();
            }
        }, 
        function(err,result){
            // print_ins( arguments );
            log('finished initialising');
            if( callback )
                callback();
        }
    );
    
}