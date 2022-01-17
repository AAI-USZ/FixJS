function(el,objs,targets,options){
		var i;
		this.el=el;
		this.objs = objs;
		this.targets = targets;
		targetManagers.push(this);
		this.options = {
			isChangeHtmlParent:false,
			timeEnd : 400,
			timeWaitForRefresh : 500
		}
		for(i in options){ this.options[i] = options[i]; }
		this.onChange = MultiDrag.util.triggerFactory({context:this});
		options.onChange && this.onChange.add(options.onChange);
		this.init();
	}