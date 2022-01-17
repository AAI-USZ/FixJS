function(){
            switch(typeof value){
                case 'undefined':

                break;

                case 'string':

                break;

                case 'function':
                    baidu.each(this, function(item,index){
                        baidu.dom(item).html(value.call(item, index, html(item)));
                    });
                break;

                default:
                break;
            };
        }