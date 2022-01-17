function(Y) {

/**
 * Provides easy and custom navigation across various dom elements using keyboard.
 *
 * @module gallery-navigate
 */


/*CONSTANTS*/
var KEY_DOWN  = 40,
	KEY_ENTER = 13,
	KEY_ESC   = 27,
	KEY_TAB   = 9,
	KEY_UP    = 38,
	KEY_RIGHT = 39,
	SHIFT_RIGHT_ARROW = 'down:39+shift',
	Nav = function(config){
		Nav.superclass.constructor.apply(this, arguments);
	};



/**
* @property NAME
* @type String
* @default Navigation
*/
Nav.NAME = "Navigation";





/**
* "Associative Array", used to define the set of attributes
* added by this class. The name of the attribute is the key,
* and the object literal value acts as the configuration
* object passed to addAttrs
*/
Nav.ATTRS = {

    node: {
        setter: function(node) {
            var n = Y.one(node);
            if (!n) {
                Y.log('Invalid Node Given in initialization ' + node);
            }
            return n;
        }
    }
};

Y.extend(Nav, Y.Base, {

    /**
    *
    * Container Object with:
    * - navigable container id: string
    * - children[]: Node-Array that has all the child nodes of the navigable container
    * - childIndexInFocus: Integer, that indicates the current index selected for the navigable container.
    */
    container:{
		containerId:null, /*String*/
		children:[], /*array type*/
		childIndexInFocus:-1/* if there are 10 div elements in navigable container then this variable holds the index of the one in focus*/
    },



    /**
    * Tasks MyClass needs to perform during
    * the init() lifecycle phase
    * Function for initialization, it defaults registers the node provided in the contructor, during object creation.
    */
    initializer: function(cfg){
		var node = this.get('node');
		Y.log(node);
		if(node){
			this.registerNavigableContainer(node);
			Y.log('Navigable Container Object:','debug');
			Y.log(this.container,'debug');
		}
    },


    /**
    * Tasks MyClass needs to perform during
    *
    * the destroy() lifecycle phase
    */
    destructor : function() {
		/* Use purge ( recurse  type ) chainable
		Provided by the node-base module.
		Defined in node/js/node-event.js:69
		Removes event listeners from the node and (optionally) its subtree
		*/
		delete this.anim;
    },

	/**
	* Function to enable smooth scrolling
	* @param: y - integer, that represents the calculated height by which scroll should happen on Y axis on window object
	*
	*/
    animateScroll: function(y){
		this.anim = new Y.Anim({
          node: 'window',
          from: {
			scroll: [Y.DOM.docScrollX(),Y.DOM.docScrollY()]
          },
          to: {
            scroll : [Y.DOM.docScrollX(),y]
          },
          duration: 0.3,
          easing:  Y.Easing.easeOutStrong
        }).run();
		/**  //http://yuilibrary.com/yui/docs/api/classes/Easing.html
		* backBoth backIn backOut bounceBoth bounceIn bounceOut easeBoth easeBothStrong easeIn easeInStrong easeNone easeOut easeOutStrong elasticBoth elasticIn elasticOut
		*/
       
    },

    /**
    * Function to adjust scrolling and centering the child element which is in focus
    * @param Node: DOM element(child node in focus of the navigable container)
    */
	scrollToCenter: function(Node){
		var childsY = Node.getY();
		var childHeight = Node.get('clientHeight');
		var adjustScroll = childHeight/2;
		var winHeight = Node.get('winHeight');
		if(childHeight>winHeight){
			adjustScroll = 0;  //this is to make sure that if the child is taller than the screen then just position it								// position its top at the center of the screen.
		}
		var halfwinheight = winHeight/2;
		if(childsY>halfwinheight){
			
			if(this.anim && this.anim.get('running')){
				this.anim.pause();
			}
			//window.scroll(0,childsY-halfwinheight+adjustScroll);
			this.animateScroll(childsY-halfwinheight+adjustScroll);
		}
	},





	/**
	* Function to get the next child index on key down event.
	* @param :integer, previous child index (for eg: 0 means 1st child)
	* @return: integer, the new child index to be navigated to or focused to.
	*/
	getNextIndex: function(childIndexInFocus){
		var container = this.container,
			numofChildren = container.children.length;
		if(childIndexInFocus!=-1){
			container.children[childIndexInFocus].removeClass('highlight');
		}
		if(childIndexInFocus===numofChildren-1) {
			childIndexInFocus=-1;
			this.wasLastChild= true;
		} else {
			this.wasLastChild = false;
		}
		childIndexInFocus++;

		return childIndexInFocus;
	},





	/**
	* Function to retrieve the child-index previous to the @param1  on key up event.
	* @param :integer, current child index in focus (for eg: 0 means 1st child)
	* @return: integer, the new child index to be navigated to or focused to.
	*/
	getPreviousIndex: function(childIndexInFocus) {
		var container = this.container,
			numofChildren = container.children.length;
		if(childIndexInFocus>=0){
			container.children[childIndexInFocus].removeClass('highlight');
		}
		if(childIndexInFocus===0) {
			childIndexInFocus=numofChildren;
		}
		childIndexInFocus--;
		if(childIndexInFocus<0) {
			childIndexInFocus=0;
		}
		return childIndexInFocus;
	},


	/**
	* Function to get the new child into focus and right scroll
	* @param: Node, representing the child that should gain focus.
	*
	*/
	bringChildtoFocus:function(childInFocus){

		Y.log('In Focus:ID:'+childInFocus.generateID());
		childInFocus.addClass('highlight').focus();
		if(this.wasLastChild){
			Y.log('last child');
			if(this.anim && this.anim.get('running')){
				this.anim.pause();
			}
			childInFocus.scrollIntoView(); //this is a temp fix try to remove this and fix navigation later
		}
		this.scrollToCenter(childInFocus);
	},



    /**
    * Function
    * on keyboard down key press, will focus/navigate to next child of the container registered
    */
    onMyKeyDown: function(e){
			this.wasLastChild = false; //for handling some edge case where on down key we navigate back to 1st child.
			e.preventDefault();
			var container = this.container,
				numofChildren = container.children.length,
				childIndexInFocus = container.childIndexInFocus,
				newindex = this.getNextIndex(childIndexInFocus);
			Y.log('onkeydown:infocus:'+newindex);
			this.bringChildtoFocus(container.children[newindex]);
			container.childIndexInFocus=newindex;
	},




    /**
    * Function
    * on keyboard up key press, will focus/navigate to next child of the container registered
    */
	onMyKeyUp: function(e){
			e.preventDefault();
			var container = this.container,
				numofChildren = container.children.length,
				childIndexInFocus = container.childIndexInFocus,
				newindex = this.getPreviousIndex(childIndexInFocus);

			Y.log('onkeyup:Infocus:'+newindex);
			this.bringChildtoFocus(container.children[newindex]);
			container.childIndexInFocus=newindex;
	},


	/**
	* Function to intiate navigation on the children of the container,
	* bind the key up and down events to the relevant functions
	* @param
	*
	*/
    initiateNavigation:function(){
		/*Y.on('keypress', Y.bind(function (e) {
			if (e.keyCode === 39) {
				e.halt();
				alert('right key pressed');
			}
		},this));*/
		

		Y.one('body').on("key",  function(e) {
			//alert('asd');
			console.log('Shift+RightArrow was pressed');
		},SHIFT_RIGHT_ARROW);



		/** on KeyDown **/
		if(Y.BodySubscr){
			this.killNavigation();
		}else{
			Y.BodySubscr = {};
		}
		Y.BodySubscr.keydown = Y.one('body').on('down',Y.bind(this.onMyKeyDown,this));
		/** ON KeyUp **/
		Y.BodySubscr.keyup = Y.one('body').on('up',Y.bind(this.onMyKeyUp,this));
    },



	/**
	* Function to detach navigation and all events on the body key events
	*
	* @param none
	*
	*/
    killNavigation: function() {
		Y.log("killing all subscriptions");

		for(var subscription in Y.BodySubscr){
			Y.log('detaching subscription:'+subscription);
			Y.BodySubscr.subscription.detach();
			delete Y.BodySubscr;
		}
    },



    /**
    * @param node: String representing the navigable containers id.
    * register the container that needs navigation
    */
    registerNavigableContainer: function(node){
		var childrenObj = node.all('> *');
		var children = [];
		childrenObj.each(function(child,i,parent){
			children[i] = child;
		});
		this.container.children = children;
		this.container.containerId = node.generateID();//generateID() returns existing node id or creates one if it doesnt exist
		Y.log('Navigable ContainerId:'+this.container.containerId);
		Y.log('total num of children:'+children.length);
		Y.log('children:['+children+']');
		return this.container;
    },

/**
	elementInViewport:function (el) {
		var rect = el.getBoundingClientRect();

		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= window.innerHeight &&
			rect.right <= window.innerWidth
        );
	},
*/
	/** test function which outputs a message to console.
	* @param msg(String)
	*/
    splash : function(msg){
		if(msg){
			Y.log(msg);
		}
		try{
			Y.log(this.get('node').addClass('dark'));
		} catch(err){
			Y.log(err);
		}
	}


});




Y.Nav = Nav;


}, '@VERSION@' ,{requires:['node', 'event', 'event-key', 'gallery-event-nav-keys', 'base', 'anim'], skinnable:false}