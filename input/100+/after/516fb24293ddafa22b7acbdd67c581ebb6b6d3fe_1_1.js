function(tang, target, callback, orie){

    var insert = baidu.dom(target),

        first = insert[0],

        tangDom;

        

    if(orie && first && (!first.parentNode || first.parentNode.nodeType === 11)){

        orie = orie === 'before';

        tangDom = baidu.merge(orie ? tang : insert, !orie ? tang : insert);

        if(tang !== tangDom){

            tang.length = 0;

            baidu.merge(tang, tangDom);

        }

    }else{

        for(var i = 0, item; item = insert[i]; i++){

            baidu.dom._smartInsert(baidu.dom(item), i > 0 ? tang.clone(true) : tang, callback);

        }

    }

}