function XML(ver, enc){
	var t = this
	if (t instanceof XML === false) return new XML(ver, enc)
	t.root = t
	t.ver = ver||"1.0"
	t.enc = enc||"utf-8"
	t.childs = []
	t.toString = function(){
		return '<?xml version="'+t.ver+'" encoding="'+t.enc+'"?>'+t.childs.join("")+(t.str||"")
	}
}