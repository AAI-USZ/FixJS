function(){
        var prototype =  Object.create(this);
        if(this.value && baseNode.isPrototypeOf(this.value)){
            prototype.value = this.value.create();
        }
        return prototype;
    }