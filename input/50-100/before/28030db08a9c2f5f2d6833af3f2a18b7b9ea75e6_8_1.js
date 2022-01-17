function(){
        // 继承父类的构造器
        if(superClass != baidu.lang.Class){
            superClass.apply(this, arguments);
        }else{
            superClass.call(this);
        }
        constructor.apply(this, arguments);
    }