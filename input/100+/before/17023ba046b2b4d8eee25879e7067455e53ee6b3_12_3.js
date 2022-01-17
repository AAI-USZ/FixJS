function(name){
		var arr=[], n, i=0
		if (this.str) while (this.get());
  	while (n=this.childs[i++]) if (!name||name===n.name) arr.push(n)
		return arr
  }