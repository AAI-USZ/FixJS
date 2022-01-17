function(){
        var g =this;
        g._clearBindings();
		baidu.dom.empty(g.element);
        g.dispatchEvent("dispose",{});
		baidu.lang.Class.prototype.dispose.call(g);
	}