function(func,sCls,absolute){

    if(absolute==undefined || absolute==false){

        return function(){

            var sClass=sCls;

            var oldSuper=this.superClass;

            this.superClass=sClass.prototype.superClass;

            var ret=func.apply(this,arguments);

            this.superClass=oldSuper;

            return ret;};

    }else{

        return function(){

            var sClass=sCls;

            var oldSuper=this.superClass;

            this.superClass=sClass;

            var ret=func.apply(this,arguments);

            this.superClass=oldSuper;

            return ret;};

    }



}