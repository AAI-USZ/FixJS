function(args){
    console.log(args);
    if(args.jp.length != args.jp.length){
        return false;
    }
    var i, j=[], offSet;
    for(i=0;i<args.en.length;i++){
        if(args.en[i].line.length != args.jp[i].line.length){
            offSet = {
                en: args.en[i].length,
                jp: args.jp[i].length,
                index: i
            };
            j.push(offSet);
        }
    }
    return j;
}