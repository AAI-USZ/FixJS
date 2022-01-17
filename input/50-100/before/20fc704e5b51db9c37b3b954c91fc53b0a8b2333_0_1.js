function disturb(e){
    var level = $(e.target).attr('data-value');
    for(var i=0;i<level;i++){
        disturb_one();
    }
    is_start = true;
}