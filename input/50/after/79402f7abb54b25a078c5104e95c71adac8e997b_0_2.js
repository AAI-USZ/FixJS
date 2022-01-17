function(cfg, callback){
        try{
            new CssCombo(cfg, callback);
        }catch (e){
            utils.log(e);
            callback && callback(e);
        }
    }