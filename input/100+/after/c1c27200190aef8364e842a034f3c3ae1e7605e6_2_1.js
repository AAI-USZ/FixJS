function(options,callback){
    if( _.isFunction(options) ){
        callback = options;
    }
    options = (options || {});
    
    // boot the game manager
    var statePath = Common.path.join( Common.paths.data, 'states', 'game_manager.json');
    // var gameManager = exports.gameManager = Common.entity.GameManager.create(null,{
    //     statePath:statePath });


    var gameManager = exports.gameManager = GameManager.create(null,
        {statePath:statePath, restore:true, callback:callback});

}