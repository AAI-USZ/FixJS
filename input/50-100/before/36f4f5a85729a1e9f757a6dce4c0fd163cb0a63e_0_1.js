function(n){
    var i = Notice.findOne({}, {skip: n});
    if(i){
        console.log('[remove]', i.content);
        Notice.remove(i._id);
    }else{
        console.log('[err] cant find this notice');
    }
}