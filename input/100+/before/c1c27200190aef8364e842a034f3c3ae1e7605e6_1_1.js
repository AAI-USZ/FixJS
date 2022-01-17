function(attrs, options){
    options = (options || {});
    var result = entity.create( _.extend({type:'game_manager'}, attrs) );
    if( options.statePath ){
        var state = require( options.statePath );
        result.set( result.parse(state,null,{parseFor:'game_manager'}) );    
    }
    return result;
}