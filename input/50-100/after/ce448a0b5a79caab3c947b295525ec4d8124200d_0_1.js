function JRObject (type, value){
  this.type  = type;
  this.value = value;
  this.toJSON = function(){
     var data = {};
     for(p in value)
       if(p != "toJSON")
         data[p] = value[p];
     return {json_class: this.type, data: data };
  };
}