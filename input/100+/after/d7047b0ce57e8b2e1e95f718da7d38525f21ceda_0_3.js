function(args){
    console.log(args);
    if(args.en.length != args.jp.length){
        return false;
    }
    var i, j=[], offSet;
    for(i=0;i<args.en.length;i++){
        if(args.en[i].line.length != args.jp[i].line.length){
            offSet = {
                en: args.en[i].line.length,
                jp: args.jp[i].line.length,
                index: i
            };
            j.push(offSet);
        }
    }
    console.log(j[0].en);
    return j;
}