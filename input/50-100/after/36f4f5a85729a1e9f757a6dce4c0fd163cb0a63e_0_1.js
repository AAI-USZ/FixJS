function(n){
    var i = Notice.findOne({}, {skip: n});
    if(i){
        Notice.remove(i._id);
    }else{
    }
}