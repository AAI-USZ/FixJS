function(){
        var prototype =  Object.create(this);
        if(this.value && this.value.isPrototypeOf(baseNode)){
            prototype.value = this.value.create();
        }
        return prototype;
    }