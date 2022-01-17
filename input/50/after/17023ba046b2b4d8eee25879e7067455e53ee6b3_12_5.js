function(){
		var t = this;
  	t.up && t.up.childs.splice(t.id,1);
  	return t;
  }