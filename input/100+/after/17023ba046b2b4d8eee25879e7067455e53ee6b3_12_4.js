function(n){
  			return name === n.name && (!key || key in n.attr) && (!val || n.attr[key] === val);
  		}