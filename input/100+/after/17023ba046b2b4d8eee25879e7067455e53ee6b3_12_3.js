function(name,key,val){
  	var t = this, n = null, m;
  	if (name) {
  		var i=0, test = function(n){
  			return name === n.name && (!key || key in n.attr) && (!val || n.attr[key] === val);
  		}
  		while (m=t.childs[i++]) if (test(m)) return m;
  		if (t.str) while (m=t.get()) if (test(m)) return m;
  	} else if (m = t.str.match(/\s*<([^ \/>]+)([^>]*)>\s*/m)) {
  		n = new XML.node(m[1], XML.parse_attr(m[2]) );
  		n.root = t.root;
  		var len = m[0].length;
  		if (m[2].charAt(m[2].length-1)!=="/") {
				var end = t.str.indexOf('</'+m[1]+'>');
  			n.str = t.str.substring(len, end);
  			len=end+3+m[1].length;
  		}
  		t.str = t.str.substr( len );
  		t.childs.push(n);
  	}
  	return n;
  }