function( $ ){

    var Scroller = function( o, element ){ 
        this.element = element;
        this.parent = null;
        this.upBtn = null;
        this.downBtn = null;
        this.handle = null;
        this.func = null;
        this.dim = null;
        this.enterTimeout = null;
        this.options = {
            minHandleSize: 10,
            orientation: 'vertical',
            scrollDistance: 10, // Distance in pixels of each scroll
            showButtons: false,
            enterTimeoutDuration: 2000, // 2 seconds
            mouseholdDeadtime: 500, // Time to continue holding
            mouseholdTimeout: 10 // Mousehold timeout (ms)
        };

        // Init the scroller
        this.init( o );
    };    
    
    Scroller.prototype = {

        constructor: Scroller,

        init : function( o ){           
            var self = this;

            // Extend the input options
            $.extend( this.options, o );

            //Set the size function to call from jQuery
            this.func = this.options.orientation === 'vertical' ? ['height', 'outerHeight'] : ['width', 'outerWidth'];
            this.dim = this.options.orientation === 'vertical' ? 'top' : 'left';

            // Wrap the element and add scroller template
            this.element.addClass('scroll-content').css( 'position', 'relative'
            ).css( this.dim, '0px'
            ).wrap( '<div class="scrollable" />' 
            ).parent().append(                
                '<div class="scroller">'+
                    '<div class="scroller-up scroller-up-down" direction="-1"></div>'+
                    '<div class="scroller-handle-wrap">'+
                        '<div class="scroller-handle"></div>'+
                    '</div>'+
                    '<div class="scroller-down scroller-up-down" direction="1"></div>'+
                '</div>'
            // ).css( 'position', 'relative' 
            ).addClass( this.options.orientation );

            // Create quick reference elements
            this.parent = this.element.parent();
            this.upBtn = this.parent.find(".scroller-up");
            this.downBtn = this.parent.find(".scroller-down");
            this.handle = this.parent.find(".scroller-handle");

            // Show scroll buttons?
            if( !this.options.showButtons ){
                this.upBtn.hide();
                this.downBtn.hide();
            }

            // Make the handle draggable
            this.handle.draggable({
                bound: true,
                lock: this.options.orientation === 'vertical' ? 'horizontal' : 'vertical',
                onMove: function () {
                    if ( self.element[ self.func[0] ]() > self.parent[ self.func[0] ]() ) {
                        self.scrollContent();
                    }
                }
            });

            //Adjust size of scroll-bar-wrap so handle is always visible
            this.sizeScrollerHandle();
            this.bindEvents();
        },

        // Calculate the size of the scroller handle
        sizeScrollerHandle: function () {
            var handleWrapSize,
                handleSize = 0;

            // Calculate the handle size
            if( this.parent[ this.func[0] ]() < this.element[ this.func[0] ]() ){
                handleSize = this.parent[ this.func[0] ]() * ( this.parent[ this.func[0] ]() / this.element[ this.func[0] ]() ); 
                handleSize = this.upBtn.is(':visible') ? handleSize - ( this.downBtn[ this.func[1] ]() + this.upBtn[ this.func[1] ]() ) : handleSize;
                handleSize = handleSize < this.minHandleSize ? this.minHandleSize : handleSize;
            }

            //Set the handle size and wrap size
            this.handle[ this.func[0] ]( handleSize );
            handleWrapSize = this.upBtn.is(':visible') ? this.parent[ this.func[0] ]() - ( 2 * this.upBtn[ this.func[1] ]() ) : this.parent[ this.func[0] ]();
            this.handle.parent()[  this.func[0]  ]( handleWrapSize );
        },

        // Adjust scroller to match content size
        reflowContent : function () {
            var newScroll,
                currentScroll = parseFloat( this.element.css( this.dim ).replace('px', '') );

            // First resize the scroller
            this.sizeScrollerHandle();

            if( this.element[ this.func[0] ]() < this.parent[ this.func[0] ]() ){
                newScroll = 0;
            } else if( currentScroll + this.element[ this.func[0] ]() < this.parent[ this.func[0] ]() ){
                newScroll = this.parent[ this.func[0] ]() - this.element[ this.func[0] ]();
            } else {
                newScroll = currentScroll *
                            ( this.handle.parent()[ this.func[0] ]() - this.handle[ this.func[0] ]() ) /
                            ( this.element[ this.func[0] ]() - this.parent[ this.func[0] ]() );
            }  

            this.element.css( this.dim, newScroll + 'px' );          
        },

        // Bind all the events to move the scroller
        bindEvents : function () {
            var self = this;

            // Move the scroller with the mousewheel using the event helper
            this.parent.on('mousewheel.scroller', function ( event, delta, deltaX, deltaY ) {
                delta = self.options.orientation === 'vertical' ? deltaY : deltaX;                
                self.scrollHandle( -1 * delta );
                event.preventDefault();
                clearTimeout( self.enterTimeout );
                setEnterTimeout();
            });

            // When clicking, ensure the mouseenter class is set for the duration
            this.handle.on( 'mousedown.scroller', function ( event ) {
                clearTimeout( self.enterTimeout );
                self.handle.addClass('mouseenter');
            });

            $(document).on('mouseup.scroller', function () {
                if( self.handle.hasClass('mouseenter') ){
                    setEnterTimeout();
                }
            });

            // Move the scroller with up/down clicks and mousehold
            this.parent.find('.scroller-up-down').on('mousedown.scroller', function () {
                self.scrollHandle( parseInt( $(this).attr('direction'), 10 ) );
            });

            if ( typeof $.mousehold === 'function' ){
                this.parent.find('.scroller-up-down').mousehold( self.options.mouseholdTimeout, self.options.mouseholdDeadtime, function () {
                    self.scrollHandle( parseInt( $(this).attr('direction'), 10 ) );
                });
            }

            // Clicking in the handle wrap should move handle to that location
            this.handle.parent().on( 'click.scroller', function ( event ) {
                var pos,
                    page = self.dim === 'top' ? event.pageY : event.pageX,
                    clickPos = page - self.handle.parent().offset()[ self.dim ],
                    handlePos = self.handle.position()[self.dim];

                // Make sure not over handle
                if( clickPos < handlePos || ( handlePos + self.handle[ self.func[0] ]() ) < clickPos ){
                    pos = clickPos < handlePos ? clickPos : clickPos - self.handle[ self.func[0] ]();
                    self.handle.draggable( "moveElement", self.dim, pos );
                }
            });

            // Moving mouse into scroller adds 'mouseenter' class
            this.parent.on('mouseenter.scroller', setEnterTimeout );

            function setEnterTimeout() {
                self.handle.addClass('mouseenter');
                self.enterTimeout = setTimeout( function () {
                    self.handle.removeClass('mouseenter');
                }, self.options.enterTimeoutDuration );
            }
        },

        // Move the scroller handle (events will need to call this)
        scrollHandle : function( direction ){
            // Calculate the handle scroll value
            var weight = this.options.scrollDistance * ( this.handle.parent()[ this.func[1] ]() - this.handle[ this.func[0] ]() ) / 
                ( this.element[ this.func[0] ]() - this.parent[ this.func[0] ]() ),
                diff = direction > 0 ? Math.ceil( direction * weight ) : Math.floor( direction * weight );
            
            // Move the scroll handle
            this.handle.draggable( "moveElement", this.dim, this.handle.position()[ this.dim ] + diff );
        },

        // Scroll the content
        scrollContent : function(){
            // Calculate the element position
            var val = - this.handle.position()[this.dim] * ( this.element[ this.func[1] ](true) - this.parent[ this.func[0] ]() ) / 
                ( this.handle.parent()[ this.func[0] ]() - this.handle[ this.func[0] ]() );

            // Move the content by the specified scroll distance
            if( val <= 0 && Math.abs( val ) + this.parent[ this.func[0] ]() < this.element[ this.func[0] ]() ){
                this.element.css( this.dim, val + 'px' );
            } else if( 0 < val ) {
                this.element.css( this.dim, '0px' );
            } else {
                this.element.css( this.dim, - ( this.element[ this.func[1] ](true) - this.parent[ this.func[0] ]() ) + 'px' );
            }
        }
    };
    
    
    $.fn.scroller = function( method ) {
        var ret,
            data,
            args = arguments;

        return this.each(function(){
            // Grab the object or create if not exist
            data = $(this).data( 'scroller' );            
            if( !data ){
                data = $(this).data( 'scroller', { 
                    o : new Scroller( method, $(this) ) 
                }).data( 'scroller' );
            }

            // Call method if it exists
            if ( data.o[method] ) {
                ret = data.o[ method ].apply( data.o, Array.prototype.slice.call( args, 1 ) );
            }  
            return typeof ret === 'undefined' ? $(this) : ret;        
        });
    };
}