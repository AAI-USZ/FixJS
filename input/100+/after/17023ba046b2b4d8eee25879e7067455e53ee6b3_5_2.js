f		var t = this;
		t.id = id;
		t.el = El("div");
		t.el._parent = parent
		t.el.haml_done = function(){
			var str = t.el.innerHTML
			  , fn = str.indexOf("data-template") > -1 ? custom_init : null;


			if (str.indexOf("{{") < 0 && str.indexOf("{%") < 0 && t.el.childNodes.length == 1){
				El.cache(t.id, t.el.firstChild, fn);
			} else {
				t.fn = El.liquid(str)
				El.cache(t.id, t, t.parse.bind(t));
			}
			return parent;
		//	delete t.el.haml_done;
			
		}
		return t;
	}
