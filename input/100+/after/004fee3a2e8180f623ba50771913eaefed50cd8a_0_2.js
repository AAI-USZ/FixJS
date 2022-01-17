function(args){
    console.log(args);
    if(args.en.length != args.jp.length){
        return false;
    }
    var i, j=[], offSet;
    for(i=0;i<args.en.length;i++){
        if(args.en[i].line.length != args.jp[i].line.length){
            if(args.en[i].line.length==1){
                while(args.jp[i].line.length>1){
                    args.jp[i].line[0].text += args.jp[i].line.splice(1, 1)[0].text;
                }
            }else{
                offSet = {
                    en: args.en[i].line.length,
                    jp: args.jp[i].line.length,
                    index: i
                };
                j.push(offSet);
            }
            
        }
    }
    console.log(j[0].en);
    return j;
}