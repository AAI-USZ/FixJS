function (S,Component,BarRender,BarItem) {

	/**
	 * This class specifies the definition for a toolbar. 
     * Bar class is a collection of buttons,links and other command control.
     * @name Bar
     * @constructor
     * @extends Component.Controller
     * @memberOf Grid
     */
	var Bar = Component.Controller.extend(
	 /**
	 * @lends Grid.Bar.prototype
	 */	
	{
		/* 
		* @protected
        * @override
		*/
		initializer : function(){
			var _self = this,
				children = _self.get('children');

			//if a child of config is not the instance of Component.Controller
			//use BarRender.types to instantiate it
			//and bind events to it
			for(var i = 0; i < children.length; i++){
				var item = children[i];
				if(!(item instanceof Component.Controller)){
					children[i] = _self._createItem(item);
				}
			}
		},
		/**
		* get bar item by id
		* @param {String|Number} id the id of item 
		* @return {BarItem}
		*/
		getItem : function(id){
			var _self = this,
				children = _self.get('children'),
				result = null;
			S.each(children,function(child){
				if(child.get('id') === id){
					result = child;
					return false;
				}
			});
			return result;
		},
		//use BarRender.types to instantiate item
		//and bind events to it
		_createItem : function(item){
			if(item instanceof Component.Controller){
				return item;
			}
            
            if(item.xclass){
                return item;
            }

			//default type is button
			if(!item.xtype){
				item.xtype = 'button';
			}
			var typeCls = BarItem.types[item.xtype] , 
				itemControl = null;
			if(typeCls){
				itemControl = new typeCls(item);
			}else{
				itemControl = new BarItem(item);
			}
			return itemControl;
		}
	},{
		ATTRS:/** @lends Grid.Bar.prototype*/
		{
			/**
			* @protected
			*/
			focusable : {
				value : false
			},
			/**
			* @private
			*/
			xrender : {
				value : BarRender	
			}
		},
		BarItem : BarItem
	},{
		xclass : 'bar',
		priority : 1	
	});

	return Bar;
}