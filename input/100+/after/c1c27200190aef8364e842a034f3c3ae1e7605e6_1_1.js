function(attrs, options){
    options = (options || {});
    var result = entity.create( _.extend({type:'game_manager'}, attrs) );
    if( options.statePath ){
        var state = require( options.statePath );
        // print_var( result );
        result.set( result.parse(state,null,{parseFor:'game_manager'}) );    
    }

    if( options.restore ){
        Step(
            function(){
                print_var( result );
                result.fetchRelatedCB( this );        
            },
            function(err,existing){
                if( err ){
                    // doesn't exist - go for saving instead
                    result.saveCB(this);
                }else{
                    this();
                }
            }, 
            function(err,saved){
                log('finished initialising');
                if( options.callback )
                    options.callback();
            }
        );
    }
    return result;
}