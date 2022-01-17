function GenericElement_prototype_make () {
		var namespace = INNERCONTEXT.CONSTANTS.NAMESPACE
		  , args	  = this.args
		  , eleName   = INNERCONTEXT.UTILITY.makeEleName(this.prefix, this.ele, args.id || Object.getPrototypeOf(this).counter++, args.type)
		  ;

		namespace = ' ' + namespace;
		args.id = eleName;
		this.ele = $.make(this.ele, args);
		void 0 !== this.text ? this.ele.text(this.text)
								 : void 0 !== this.html && this.ele.html(this.html);
		'object' === typeof this.css && this.ele.css(this.css);
		'object' === typeof this.data && this.ele.data(this.data);
		this['class'] = $.trim([ (this['class'] || ''), namespace, this.addedClasses.join(namespace) ].join(''));
		!!this.hide && this.ele.hide();
		INNERCONTEXT.DOM[eleName] = this.ele;

		return this.ele;
	}