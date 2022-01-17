function(chunk, callback){
  var self   = this;
  //var chunks = chunk.split(' ');
  var chunks = chunk.match(/(\d+) (http.+?) (.+?)\/- (.+?) (.{3,}?)( .*|)/);
  
  if(chunks){
    var params = {
      id:       chunks[1],
      url:      chunks[2],
      ip:       chunks[3],
      username: chunks[4],
      method:   chunks[5],
      domain:   url.parse(chunks[2]).hostname
    };
    
    this.core.isAllowed(params, function(result, rule){
      var tmp = params.id;

      if(typeof result == 'string'){
        if(!result.match(/http(s|):\/\//)) result = 'http://' + result;
        tmp += ' ' + (rule.mode == 'redirect' ? '302:' : '') + result;
      }

      callback(tmp);
    });
  }else{
    if(chunk.length > 1){
      self.core.log.error({error:'Can\'t parse input', source:'squid parse', input: chunk});
      callback(chunk.split(' ')[0]);
    }
    
  }  
}