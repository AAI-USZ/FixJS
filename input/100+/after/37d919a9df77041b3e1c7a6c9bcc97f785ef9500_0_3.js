function GenericElement_prototype_make () {
		var namespace = INNERCONTEXT.CONSTANTS.NAMESPACE
		  , args	  = this.args
		  , eleName   = INNERCONTEXT.UTILITY.makeEleName(this.prefix, this.ele, args.id || Object.getPrototypeOf(this).counter++, args.type)
		  ;

		namespace = ' ' + namespace;
		args.id = eleName;
		args['class'] = $.trim( [ $.trim( args['class'] ) || '', namespace, this.addedClasses.join(namespace) ].join('') );
		this.ele = $.make(this.ele, args);
		void 0 !== this.text ? this.ele.text(this.text)
		                     : void 0 !== this.html && this.ele.html( this.html );
		this.css && Object === this.css.constructor && this.ele.css( this.css );
		this.data && Object === this.data.constructor && this.ele.data( this.data );
		!!this.hide && this.ele.hide();
		INNERCONTEXT.DOM[eleName] = this.ele;

		return this.ele;
	}