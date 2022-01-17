function update(options){
        if(!isCancel){
            op = baidu.extend(op,options || {});
            cancel();
            render();
        }
    }