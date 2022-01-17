function(name, attr){
  	var t = this, n = typeof(name)=="string" ? new XML.node(name, attr) : name;
  	n.up = t;
  	n.root = t.root;
  	n.id = t.childs.length;
  	t.childs[n.id] = n;
  	return n;
  }