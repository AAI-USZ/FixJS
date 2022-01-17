function(tagName, className, root)
  {
		if (typeof(root) == "undefined") { root = this.getTopContainer(); }
		
		if (className == null) {	return root.getElementsByTagName(tagName); }
		else { return D.getElementsByClassName(className, tagName, root);	}
	}