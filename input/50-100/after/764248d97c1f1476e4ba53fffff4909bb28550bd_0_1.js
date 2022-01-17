function Flex(element, options) {
		this.version = '0.2';
		this.element = $(element);
		this.tiles = this.element.find("a");
		this.options = $.extend({},defaults,options);
		this.list = [];
		this.cache = [];
		
		this.init();
	}