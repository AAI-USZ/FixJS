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
	SHIFT_LEFT_ARROW = 'down:37+shift',
	_NEXT = true,
	_PREV = false,
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

    /*node: {
        setter: function(node) {
            var n = Y.one(node);
            if (!n) {
                Y.log('Invalid Node Given in initialization ' + node);
            }
            return n;
        }
    },*/
    activeRegistryIndex:{value:null},
    registry:[]
};

Y.extend(Nav, Y.Base, {

    /**
    * centralized approach where this container object is the source of truth and is the only thing that is activated.
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
		var self = this;

		Y.one('body').on("key",  function(e) {
			Y.log("============================");
			Y.log('Shift+RightArrow was pressed');
			self.makeNextContainerNavigable(_NEXT);
		},SHIFT_RIGHT_ARROW);

		Y.one('body').on("key",  function(e) {
			Y.log("============================");
			Y.log('Shift+Left was pressed');
			self.makeNextContainerNavigable(_PREV);
		},SHIFT_LEFT_ARROW);

		this.makeNextContainerNavigable();




    },
    /**
    * @param : boolean (true: get next container, false: get previous container)
    */
    makeNextContainerNavigable:function(shiftRight){
		var registry = this.get('registry'),
			index;
		if(registry.length>0){
			index = this.getNextRegistryIndex(shiftRight);
			if(index!== null && registry[index]){
				var node = Y.one(registry[index].node);

				if(node){
					this.deactivateRegisteredContainer();
					this.registerContainer(node);
					this.initiateNavigation();
				} else {
					this.deactivateRegisteredContainer();
					Y.log('Registered Container does not exist:id='+registry[index].node);
				}
			}
		} else {
			Y.log('nothing was registered for navigation');
		}
    },


    /**
    * @param: boolean: true: meaning Shift-Right
    */
    getNextRegistryIndex:function(isRightKeyPressed) {
		var registry = this.get('registry'),
			regLen,
			regIndex=null;

		if(registry && registry.length>0) { //if no registry exists then nothing was registered
			
			var i=0;
			for(i=0;i<registry.length;i++){
				regLen = registry.length;
				regIndex = this.get('activeRegistryIndex');
				if(regIndex===null){ //case when we start first time
					regIndex = 0;
				}else{
					regIndex = isRightKeyPressed ? (regIndex+1) : (regIndex-1);
					if(regIndex>=regLen){
						regIndex = 0;
					}
					if(regIndex<0){
						regIndex = regLen-1;
					}
				}
				this.set('activeRegistryIndex',regIndex);
				Y.log('NextRegistryIndex:'+this.get('activeRegistryIndex'));
				if(Y.one(registry[regIndex].node)){//node is fine
					return regIndex;
				}else{
					Y.log('Registry contains a node which couldnt be found on page. Node:'+registry[regIndex].node);
				}
			}
			return regIndex;
		}
		return null;
	},

    /**
	* Function to update the Class's container object with children of current node being registered.
	*
    */
    registerContainer:function(node){

		if(node){
			Y.log('activating container for navigation. Node:#'+node.generateID());
			Y.log(node);
			this.updateChildren(node); //will update node-container.children as array
			Y.log('Navigable Container Object:','debug');
			Y.log(this.container,'debug');
			Y.log('container is ready for navigation');
		}
    },


    /**
    * @param node: String representing the navigable containers id.
    * register the container that needs navigation
    * updates the container-object:
    *	- gets all the children of the @param node, and puts them in an array.
    *	- updates the container id if it has one else generates a dummy one.
    */
    updateChildren: function(node){
		var childrenObj = node.all('> *');
		var children = [];
		childrenObj.each(function(child,i,parent){
			children[i] = child;
		});
		this.container.children = children;
		this.container.containerId = node.generateID();//generateID() returns existing node id or creates one if it doesnt exist
		//Y.log('Navigable ContainerId:'+this.container.containerId);
		Y.log('total num of children:'+children.length);
		Y.log('children:['+children+']');
    },


	/**
	* Function to intiate navigation on the children of the container,
	* bind the key up and down events to the relevant functions
	* @param
	*
	*/
    initiateNavigation:function(){
		
		this.activateRegisteredContainer();
    },

    deactivateRegisteredContainer:function(){
		this.killAllSubscription();
		this.removeHighlightonCurrentChild();
		this.resetContainer();
    },

    removeHighlightonCurrentChild: function(){
		var container = this.container;
		var index = container.childIndexInFocus;
		if(index!==null && index!==-1){
			container.children[index].removeClass('highlight');
		}
    },
    resetRegistryIndex:function(){
		this.set('activeRegistryIndex',null);
    },
    resetContainer:function(){

		this.container = {
			containerId:null, /*String*/
			children:[], /*array type*/
			childIndexInFocus:-1/* if there are 10 div elements in navigable container then this variable holds the index of the one in focus*/
		};
		this.wasLastChild = false;
    },


    killAllSubscription:function() {
		if(Y.BodySubscr){
			this.detachAllSubscriptions();
		}
    },

    activateRegisteredContainer:function(){
		/** on KeyDown **/
		Y.BodySubscr = {};
		Y.log('attaching new subscription');
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
    detachAllSubscriptions: function() {
		Y.log("detaching existing subscriptions");

		for(var subscription in Y.BodySubscr){
			Y.log('detaching subscription:'+subscription);
			Y.BodySubscr[subscription].detach();
		}
		delete Y.BodySubscr;
    },


    /**
    * Function
    * on keyboard down key press, will focus/navigate to next child of the container registered
    */
    onMyKeyDown: function(e){
		this.wasLastChild = false; //for handling some edge case where on down key we navigate back to 1st child.
		if(this.container){
			e.preventDefault();
			var container = this.container,
				childIndexInFocus = container.childIndexInFocus,
				newindex = this.getNextIndex(childIndexInFocus);
			Y.log('onkeydown:infocus:'+newindex);
			container.childIndexInFocus=newindex;
			this.bringChildtoFocus(container.children[newindex]);
			
		}
	},




    /**
    * Function
    * on keyboard up key press, will focus/navigate to next child of the container registered
    */
	onMyKeyUp: function(e){
		if(this.container){
			e.preventDefault();
			var container = this.container,
				childIndexInFocus = container.childIndexInFocus,
				newindex = this.getPreviousIndex(childIndexInFocus);

			Y.log('onkeyup:Infocus:'+newindex);
			this.bringChildtoFocus(container.children[newindex]);
			container.childIndexInFocus=newindex;
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
          duration: 0.1,
          easing:  Y.Easing.easeNone
        }).run();
		/**  //http://yuilibrary.com/yui/docs/api/classes/Easing.html
		* backBoth backIn backOut bounceBoth bounceIn bounceOut easeBoth easeBothStrong easeIn easeInStrong easeNone easeOut easeOutStrong elasticBoth elasticIn elasticOut
		*/
       
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
    * Function to adjust scrolling and centering the child element which is in focus
    * @param Node: DOM element(child node in focus of the navigable container)
    */
	scrollToCenter: function(Node){
		var childsY = Node.getY(),
			childHeight = Node.get('clientHeight'),
			adjustScroll = childHeight/2,
			winHeight = Node.get('winHeight');

		if(childHeight>winHeight){
			adjustScroll = 0;  //this is to make sure that if the child is taller than the screen then just position it								// position its top at the center of the screen.
		}
		var halfwinheight = winHeight/2;
		if(childsY>halfwinheight){
			
			if(this.anim && this.anim.get('running')){
				this.anim.pause();
			}
			
			return childsY-halfwinheight+adjustScroll;
		}
	},

	/**
	* Function to get the new child into focus and right scroll
	* @param: Node, representing the child that should gain focus.
	*
	*/
	bringChildtoFocus:function(childInFocus){


		childInFocus.addClass('highlight').focus();

		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$');
		var link = childInFocus.all('> a');
		link.each(function(child,i,parent){
			child.focus();
		});
		if(this.anim && this.anim.get('running')){
			this.anim.pause();
		}


		if(this.wasLastChild){
			Y.log('last child');
			//this needs to be outside since both up and down needs this
			childInFocus.scrollIntoView(); //this is a temp fix try to remove this and fix navigation later
		}


		if(this.container.childIndexInFocus===0){
			childInFocus.scrollIntoView();
		}
		var amounttoScroll = this.scrollToCenter(childInFocus);
		//window.scroll(0,amounttoScroll);
		this.animateScroll(amounttoScroll);
	}

});




Y.Nav = Nav;


}, '@VERSION@' ,{requires:['node', 'event', 'event-key', 'gallery-event-nav-keys', 'base', 'anim'], skinnable:false}