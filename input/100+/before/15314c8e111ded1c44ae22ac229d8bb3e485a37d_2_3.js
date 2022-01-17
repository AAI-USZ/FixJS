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
	KEY_RIGHT = 39;





var Nav = function(config){
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
		if(node){
			this.registerNavigableContainer(node);
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
          to: { // can't scoll to target if it's beyond the doc height - window height
            scroll : [Y.DOM.docScrollX(),y]
          },
          duration: 0.5,
          easing:  Y.Easing.easeOutStrong
        }).run();
/**
backBoth backIn backOut bounceBoth bounceIn bounceOut
easeBoth
easeBothStrong
easeIn
easeInStrong
easeNone
easeOut
easeOutStrong
elasticBoth
elasticIn
elasticOut
*/
        //http://yuilibrary.com/yui/docs/api/classes/Easing.html
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
		//Node.scrollIntoView();
		if(childsY>halfwinheight){
			//window.scroll(0,childsY-halfwinheight+adjustScroll);
			if(this.anim && this.anim.get('running')){
				this.anim.pause();
			}
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
			this.wasChildLast= true;
		} else {
			this.wasChildLast = false;
		}
		childIndexInFocus++;

		return childIndexInFocus;
	},





	/**
	* Function to get the child index previous to the @param1 index on key up event.
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
		childInFocus.addClass('highlight').focus();
		if(this.wasChildLast){
			if(this.anim && this.anim.get('running')){
				this.anim.pause();
			}
			childInFocus.scrollIntoView();
		}
		this.scrollToCenter(childInFocus);
	},



    /**
    * Function
    * on keyboard down key press, will focus/navigate to next child of the container registered
    */
    onMyKeyDown: function(e){
			this.wasChildLast = false; //for handling some edge case where on down key we navigate back to 1st child.
			e.preventDefault();
			var container = this.container,
				numofChildren = container.children.length,
				childIndexInFocus = container.childIndexInFocus,
				newindex = this.getNextIndex(childIndexInFocus);
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
				childIndexInFocus = container.childIndexInFocus;
				newindex = this.getPreviousIndex(childIndexInFocus);

			this.bringChildtoFocus(container.children[newindex]);
			//var childInFocus = container.children[newindex];
			//childInFocus.addClass('highlight').focus();
			//this.scrollToCenter(childInFocus);
			container.childIndexInFocus=newindex;
	},


	/**
	* Function to intiate navigation on the children of the container,
	* bind the key up and down events to the relevant functions
	* @param
	*
	*/
    initiateNavigation:function(){
		Y.on('keypress', Y.bind(function (e) {
			if (e.keyCode === 39) {
				e.halt();
				alert('right key pressed');
			}
		}));
		/** on KeyDown **/
		Y.one('body').on('down',Y.bind(this.onMyKeyDown,this));
		/** ON KeyUp **/
		Y.one('body').on('up',Y.bind(this.onMyKeyUp,this));
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
		return this.container;
    },




	/** test function which outputs a message to console.
	* @param msg(String)
	*/
    splash : function(msg){
		if(msg){
		}
		try{
		} catch(err){
		}
	}


});




Y.Nav = Nav;


}, '@VERSION@' ,{requires:['node', 'event', 'event-key', 'gallery-event-nav-keys', 'base', 'anim'], skinnable:false}