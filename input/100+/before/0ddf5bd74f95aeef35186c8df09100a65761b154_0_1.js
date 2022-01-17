function JRMessage(msg){
  this.json = msg;
  this.parsed = $.evalJSON(msg);

  this.id     = this.parsed['id'];
  this.method = this.parsed['method'];
  if(this.parsed['params']){
    this.params = this.parsed['params'];
    for(p=0;p<this.params.length;++p){
      if(JRObject.is_jrobject(this.params[p]))
        this.params[p] = JRObject.from_json(this.params[p]);
      else if(JRObject.is_jrobject_array(obj[p]))
        this.params[p] = JRObject.from_json_array(this.params[p]);
    }
  }
  this.error  = this.parsed['error'];
  this.result = this.parsed['result'];
  if(this.result && JRObject.is_jrobject(this.result))
    this.result = JRObject.from_json(this.result);
  else if(JRObject.is_jrobject_array(this.result))
    this.result = JRObject.from_json_array(this.result);
}