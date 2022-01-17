function(c,b){var a=this.retrieve("form.request");if(!a){a=new Form.Request(this,c,b);
}else{if(c){a.setTarget(c);}if(b){a.setOptions(b).makeRequest();}}a.send();return this;});})();(function(){