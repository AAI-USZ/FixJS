function() {

    // These should enable cross domain requests
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;

    // Default to show text in loading message
    $.mobile.loadingMessageTextVisible = true;

    // Default of 200 is too much, so let's set it to something less
    $.mobile.buttonMarkup.hoverDelay = 25;

    // Disable zoom
    $.mobile.zoom.enabled = false;

    // This is so the return to scrollTo will be active no matter how small the scrollTo value
    $.mobile.minScrollBack = 0;

    // We do not use cached pages, so we'd rather have this set to zero so that there is no delay
    $.mobile.loadPage.defaults.loadMsgDelay = 75;

    //animation complete callback override
    /*$.fn.animationComplete = function( callback ) {
        
        alert("inside overridden animationComplete");

        if( $.support.cssTransitions ) {
        
            return $( this ).one( 'webkitAnimationEnd animationend', callback );
        
        }else{
        
            callback.call();
            return $( this );
        }
    };*/

    // We want to override the updatePagePadding function of the fixedtoolbar prototype 
    // We need to do this so it doesn't update page padding since we will be dropping fixed
    // toolbars inline before a transition begins
    $.mobile.fixedtoolbar.prototype.updatePagePadding = function() { }

    var createHandler = function( sequential ){
        
        var simultaneous = false;

        // Default to sequential
        if( sequential === undefined ){
            sequential = true;

        } else if (sequential) {
            sequential = true;

        } else if (!sequential) {
            simultaneous = true;

        } else {
            simultaneous = true;
        }
        
        return function( name, reverse, $to, $from ) {

            var deferred = new $.Deferred(),
                reverseClass = reverse ? " reverse" : "",
                active  = $.mobile.urlHistory.getActive(),
                toScroll = ($to.toPageScrollTo || active.lastScroll) || $.mobile.defaultHomeScroll,
                screenHeight = $.mobile.getScreenHeight(),
                documentHeight = $(document).height(),
                bodyHeight = $('body').height(),
                maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $( window ).width() > $.mobile.maxTransitionWidth,
                none = !$.support.cssTransitions || maxTransitionOverride || !name || name === "none",
                toPreClass = " ui-page-pre-in",
                pageHasFixedFooter = false,
                fixedHeaderHeight = 40, // To account for - .ui-page-header-fixed { padding-top: 2.5em; }  - from jquery.mobile.structure-1.1.0.css
                fixedFooterHeight = 48, // To account for - .ui-page-footer-fixed { padding-bottom: 3em; } - from jquery.mobile.structure-1.1.0.css
                extraGhostPadding = 5,
                scrollToDuration = 1250,
                waitToFadeFootersOut = 100,
                waitToFadeFootersIn = 100,
                whattheheck = true,
                footerFadeOutDuration = 250,
                footerFadeInDuration = 250,
                toggleViewportClass = function(){
                    
                    // This line adds the following style to the pageContainer
                    // .ui-mobile-viewport-transitioning .ui-page { width: 100%; height: 100%; overflow: hidden; }
                    $.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning");
                    
                    // This will equal viewport-<name of transition> but there are only styles defined for
                    // viewport-flip and viewport-turn so it has no effect on any of the other transitions
                    $.mobile.pageContainer.toggleClass( "viewport-" + name );
                },

                cleanFrom = function(){

                    $from.addClass( 'ui-from-page-post-transition' );

                    // This line removes the below class as well as the relevant transition styles from the $from jQuery page object
                    // .ui-mobile .ui-page-active { display: block; overflow: visible; }
                    $from.removeClass( $.mobile.activePageClass + " out in reverse " + name );
                    
                    $from.removeClass( 'ui-from-page-post-transition' );

                    //$from.height( "" );
                },

                cleanTo = function( $footer, pageHasFixedFooter ) {

                    if( pageHasFixedFooter ) {

                        $to
                            .removeClass( "out in reverse " + name )        // remove classes that caused the transition to occur
                            .removeClass(".ui-page-header-fixed-pre-out")   // remove style that set page padding-top and padding-bottom to 0px
                            .addClass("ui-page-header-fixed")               // add class that sets page padding-top to 2.5em to make room for fixed header
                            .addClass("ui-page-footer-fixed");              // add class that sets page padding-bottom to 3em to make room for fixed footer

                        $to.find('div[data-role="header"]').first()
                                                                    .removeClass("ui-header-fixed-pre-out") // remove style that set header top to 0 and width to 100%
                                                                    .prop("data-position", "fixed")         // add the data-position="fixed" propery back to the header div
                                                                    .addClass("ui-header-fixed");           // add the fixed header class back to the header div manually

                        $footer
                                .removeClass("ui-footer-fixed-pre-out") // remove style that set footer bottom to 0 and width to 100%
                                .prop("data-position", "fixed")         // add the data-position="fixed" propery back to the footer div
                                .addClass("ui-footer-fixed");           // add the fixed footer class back to the footer div manually

                    } else {

                        // remove classes that caused the transition to occur
                        $to.removeClass( "out in reverse " + name); 
                    }
                },

                getFooter = function( whichpage ) {

                    // genericize which page we're analyzing
                    var $page = null;

                    // New footer JSON object containing the type and the jQuery object
                    var $footer = null;

                    if ( whichpage == 'to' ) {

                        $page = $to;

                    } else if ( whichpage == 'from' ) {

                        $page = $from;

                    } else {

                        $page = null;
                    }

                    if ((typeof $page != 'undefined') && ($page != null)) {

                        // Check to see if there is a footer and if so, store the jQuery object
                        $footer = $page.find("div[data-role='footer']").last();

                        if ($footer.length) {

                            // Is this footer a fixed footer?
                            if ($footer.attr("data-position") == "fixed") {

                                $footer.type = "fixed";

                                if ($footer.attr("class").indexOf('ui-fixed-hidden') >= 0) {

                                    // fixed but hidden
                                    $footer.type = "hidden";
                                }
                            
                            } else if ($footer.attr("data-position") == "inline") {

                                $footer.type = "inline";

                            } else {

                                $footer = null;
                            }
                        }
                    } 

                    if ((typeof $footer != 'undefined') && ($footer != null)) {

                        return $footer;
                    }

                    return false;
                },

                prepPage = function ( which, pageHasFixedFooter ) {

                    pageHasFixedFooter = false || pageHasFixedFooter;

                    // Start it at zero so we have something to check against later
                    var totalHeight = 0;

                    $page = ( ( which == 'from' ) ? $from : $to );

                    // The to page will need some pre and post handling so everything can go in a smooth sequence
                    if ( which == 'to' ) {

                        // Set the to page opacity to 0 before setting display block and overflow visible
                        $to.addClass( 'ui-to-page-pre-transition' );

                        // Setting display block and overflow visible
                        $to.addClass( $.mobile.activePageClass );
                    }

                    defaultTotalHeight = ( ( which == 'from') ? ( screenHeight + $( window ).scrollTop() ) : ( ( screenHeight ) + toScroll ) );

                    // Let's calculate the height of $page based on the children of the main element (which theoretically should always be a page)
                    //$($page).children().each( function(index) {

                    //    totalHeight += $(this).height();
                    //});

                    if ( totalHeight == 0 ) {

                        // Use the old value as the fallback value
                        totalHeight = defaultTotalHeight;
                    }

                    if ( totalHeight > defaultTotalHeight ) {

                        // This is where we need to figure out how to handle the adjustments to the animation origins
                    }

                    // The to page will need some pre and post handling so everything can go in a smooth sequence
                    if ( which == 'to' ) {

                        // Removing the display block and overflow visible styles from page
                        $to.removeClass( $.mobile.activePageClass );
                    }

                    if (which == 'from') {

                        if (pageHasFixedFooter) {

                            $from.find('div[data-role="header"]').prop("data-position", "inline");
                            
                            $from
                                .removeClass("ui-page-header-fixed")
                                .find('div[data-role="header"]').first()
                                .removeClass("ui-header-fixed");

                            $from.find('div[data-role="footer"]').prop("data-position", "inline");

                            $from
                                .removeClass("ui-page-footer-fixed")
                                .find('div[data-role="footer"]').first()
                                .removeClass("ui-footer-fixed");
                        }

                    } else {

                        // get the footer object for the $to page
                        $footer = getFooter( 'to' );

                        // Check if the footer is fixed but hidden and store as a boolean
                        pageHasHiddenFixedFooter = (( $footer.type == "hidden" ) ? true : false);

                        // Check if the footer is fixed and store as a boolean to be accessed 3 more times below
                        pageHasFixedFooter = ( ( ( $footer.type == "fixed" ) || ( pageHasHiddenFixedFooter ) ) ? true : false );

                        if ( pageHasFixedFooter && !pageHasHiddenFixedFooter ) {

                            // Make sure the fixed footer on the page we're transitioning is not being displayed (we'll fade it in after the transition)
                            $footer .css('display', 'none')
                                    .prop("data-position", "inline")
                                    .removeClass("ui-footer-fixed");

                            $to
                                .removeClass("ui-page-header-fixed")
                                .find('div[data-role="header"]').first()
                                .removeClass("ui-header-fixed");

                            $to.removeClass("ui-page-footer-fixed");

                        } else if ( pageHasHiddenFixedFooter ) {

                            // Make sure the fixed footer on the page we're transitioning is not being displayed (we'll fade it in after the transition)
                            $footer.css('display', 'none');
                        
                        } else {

                            // nothing to do
                        }

                        // for some reason, the data-role="content" div was losing it's class="ui-content" so let's 
                        // first remove it in case it is there and then add it back in
                        $to.find('div[data-role="content"]').removeClass("ui-content").addClass("ui-content");
                    }

                    // set the page height based on the aggregate heights of the page's immediate children
                    $page.height( totalHeight );
                },

                startOut = function(){

                    // get the footer object for the $to page
                    $footer = getFooter( 'from' );

                    // Check if the footer is fixed but hidden and store as a boolean
                    pageHasHiddenFixedFooter = (( $footer.type == "hidden" ) ? true : false);

                    // Check if the footer is fixed and store as a boolean to be accessed 3 more times below
                    pageHasFixedFooter = ( ( ( $footer.type == "fixed" ) || ( pageHasHiddenFixedFooter ) ) ? true : false );

                    if ( pageHasHiddenFixedFooter ) {

                        // We don't need to wait for it to fade out
                        footerFadeOutDuration = 0;
                    }

                    if (pageHasFixedFooter) {

                        if ($(window).scrollTop() > 2) {

                            $.scrollTo( 2, scrollToDuration, 
                                
                                {
                                    easing:'easeInOutExpo', 
                                    onAfter: function() { 

                                        $footer.fadeOut(footerFadeOutDuration, function() {

                                            prepPage( 'from', pageHasFixedFooter );

                                            toggleViewportClass();

                                            prepPage( 'to' );

                                            //var start = new Date().getTime();
                                            //while (new Date().getTime() < start + 5000);

                                            $from.addClass( name + " out" + reverseClass );

                                            // if it's using a simultaneous transition handler, call the doneOut transition 
                                            // to start the to page animating in simultaneously
                                            if( simultaneous ){
                                                doneOut();
                                            
                                            } else {
                                                $from.animationComplete( doneOut ); 
                                            }
                                        }); 
                                    }
                                }
                            );

                        } else {

                            $footer.fadeOut(footerFadeOutDuration, function() {

                                prepPage( 'from', pageHasFixedFooter );

                                toggleViewportClass();

                                prepPage( 'to' );

                                $from.addClass( name + " out" + reverseClass );

                                // if it's using a simultaneous transition handler, call the doneOut transition 
                                // to start the to page animating in simultaneously
                                if( simultaneous ){
                                    doneOut();
                                
                                } else {
                                    $from.animationComplete( doneOut ); 
                                }
                            });
                        }

                    } else {

                        if ($(window).scrollTop() > 2) {

                            $.scrollTo( 2, scrollToDuration, 
                                
                                {
                                    easing:'easeInOutExpo', 
                                    onAfter: function() { 

                                        prepPage( 'from', pageHasFixedFooter );

                                        toggleViewportClass();

                                        prepPage( 'to' );

                                        $from.addClass( name + " out" + reverseClass );

                                        // if it's using a simultaneous transition handler, call the doneOut transition 
                                        // to start the to page animating in simultaneously
                                        if( simultaneous ){
                                            doneOut();
                                        
                                        } else {
                                            $from.animationComplete( doneOut ); 
                                        }
                                    }
                                }
                            );

                        } else {

                            prepPage( 'from', pageHasFixedFooter );

                            toggleViewportClass();

                            prepPage( 'to' );

                            $from.addClass( name + " out" + reverseClass );

                            // if it's using a simultaneous transition handler, call the doneOut transition 
                            // to start the to page animating in simultaneously
                            if( simultaneous ){
                                doneOut();
                            
                            } else {
                                $from.animationComplete( doneOut ); 
                            }
                        }
                    }
                },

                doneOut = function() {

                    if ( $from && sequential ) {
                        cleanFrom();
                    }

                    startIn();
                },
                
                startIn = function(){

                    // Remove the opacity 0 setting before setting display block and overflow visible
                    $to.removeClass( 'ui-to-page-pre-transition' );

                    // Setting display block and overflow visible
                    $to.addClass( $.mobile.activePageClass );  

                    $to.addClass( name + " in" + reverseClass);

                    if( none ){
                        doneIn();

                    } else {
                        $to.animationComplete( doneIn );
                    }
                },

                doneIn = function() {

                    // if we are coming FROM somewhere and if so, whether or not the transition handler is a simultaneous handler (slide)
                    if ( $from && simultaneous ) {
                        cleanFrom();
                    }
                
                    // get the footer object for the $to page
                    $footer = getFooter( 'to' );

                    // Check if the footer is fixed and store as a boolean to be accessed 3 more times below
                    pageHasFixedFooter = (( $footer.type == "fixed" ) ? true : false);

                    // Clean up the $to page
                    cleanTo( $footer, pageHasFixedFooter );

                    // Send focus to page as it is now display: block
                    $.mobile.focusPage( $to );

                    // In some browsers (iOS5), 3D transitions block the ability to scroll to the desired location during transition
                    // This ensures we jump to that spot after the fact, if we aren't there already.
                    if(( $( window ).scrollTop() !== toScroll ) && (toScroll > 1) ) {

                        // Scoll back down to last scroll position that is tracked in toScroll
                        $.scrollTo( toScroll, scrollToDuration,   
                                    
                                    {
                                        easing:'easeInOutExpo', 
                                        onAfter: function() { 

                                            // If there is a fixed footer, then we need to fade it back in
                                            if (pageHasFixedFooter) {

                                                // Fade in the fixed footer
                                                $footer.fadeIn(footerFadeInDuration, function() {

                                                    // re-enable the special scrollstart event handler
                                                    $.event.special.scrollstart.enabled = true;
                                                });

                                            } else {

                                                // re-enable the special scrollstart event handler
                                                $.event.special.scrollstart.enabled = true;
                                            }
                                        }
                                    } 
                        );

                    } else {

                        // If there is a fixed footer, then we need to fade it back in
                        if (pageHasFixedFooter) {

                            // Fade in the fixed footer
                            $footer.fadeIn(footerFadeInDuration, function() {

                                // re-enable the special scrollstart event handler
                                $.event.special.scrollstart.enabled = true;
                            });

                        } else {

                            // re-enable the special scrollstart event handler
                            $.event.special.scrollstart.enabled = true;
                        }
                    }

                    // Toggle the ui-mobile-viewport-transitioning and viewport-<transition name> classes
                    toggleViewportClass();

                    // resolve the deferred promise
                    deferred.resolve( name, reverse, $to, $from, true );
                };
            
            // Theoretically, this is the only place I need to set this
            $.event.special.scrollstart.enabled = false;

            if ( $from && !none ) {

                // Kick off the first phase of the transition
                startOut();
            
            } else {

                // Skip to the second phase of the transition if there is no from page or the transition is none
                doneOut();
            }

            // return a deferred promise to be resolved when the transition is complete
            return deferred.promise();
        };
    }

    // generate the handlers from the above
    var sequentialHandler = createHandler(),
        simultaneousHandler = createHandler( false );

    // Make our transition handler the public default.
    $.mobile.defaultTransitionHandler = sequentialHandler;

    //transition handler dictionary for 3rd party transitions
    $.mobile.transitionHandlers = {
        "default": $.mobile.defaultTransitionHandler,
        "sequential": sequentialHandler,
        "simultaneous": simultaneousHandler
    };

    // Use the simultaneous transition handler for slide transitions
    $.mobile.transitionHandlers.slide = $.mobile.transitionHandlers.simultaneous;

    // This should set the transitionFallbacks
    $.mobile.transitionFallbacks.fade       = "fade";
    $.mobile.transitionFallbacks.pop        = "pop";
    $.mobile.transitionFallbacks.flip       = "flip";
    $.mobile.transitionFallbacks.turn       = "turn";
    $.mobile.transitionFallbacks.flow       = "flow";
    $.mobile.transitionFallbacks.slidefade  = "slidefade";
    $.mobile.transitionFallbacks.slide      = "slide";
    $.mobile.transitionFallbacks.slideup    = "slideup";
    $.mobile.transitionFallbacks.slidedown  = "slidedown";

    // Override the default transitions to fix an issue caused by the rewrite of the click handler
    /*var createHandler = function( sequential ){
        
        // Default to sequential
        if( sequential === undefined ){
            sequential = true;
        }
        
        return function( name, reverse, $to, $from ) {

            var deferred = new $.Deferred(),
                reverseClass = reverse ? " reverse" : "",
                active  = $.mobile.urlHistory.getActive(),
                toScroll = ($to.toPageScrollTo || active.lastScroll) || $.mobile.defaultHomeScroll,
                screenHeight = $.mobile.getScreenHeight(),
                maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $( window ).width() > $.mobile.maxTransitionWidth,
                none = !$.support.cssTransitions || maxTransitionOverride || !name || name === "none",
                toPreClass = " ui-page-pre-in",
                toggleViewportClass = function(){
                    $.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning viewport-" + name );
                },
                scrollPage = function(){
                    // By using scrollTo instead of silentScroll, we can keep things better in order
                    // Just to be precautios, disable scrollstart listening like silentScroll would
                    $.event.special.scrollstart.enabled = false;
                    
                    window.scrollTo( 0, toScroll );
                    
                    // reenable scrollstart listening like silentScroll would
                    setTimeout(function() {
                        $.event.special.scrollstart.enabled = true;
                    }, 150 );
                },
                cleanFrom = function(){
                    $from
                        .removeClass( $.mobile.activePageClass + " out in reverse " + name )
                        .height( "" );
                },
                startOut = function(){
                    // if it's not sequential, call the doneOut transition to start the TO page animating in simultaneously
                    if( !sequential ){
                        doneOut();
                    }
                    else {
                        $from.animationComplete( doneOut ); 
                    }
                    
                    // Set the from page's height and start it transitioning out
                    // Note: setting an explicit height helps eliminate tiling in the transitions
                    $from
                        .height( screenHeight + $(window ).scrollTop() )
                        .addClass( name + " out" + reverseClass );
                },
                
                doneOut = function() {

                    if ( $from && sequential ) {
                        cleanFrom();
                    }
                    
                    startIn();
                },
                
                startIn = function(){   
                
                    // for some reason, the data-role="content" div was losing it's class="ui-content" so let's 
                    // first remove it in case it is there and then add it back in
                    $to.find('div[data-role="content"]').removeClass("ui-content").addClass("ui-content");

                    $to.addClass( $.mobile.activePageClass + toPreClass );              
                
                    // Send focus to page as it is now display: block
                    $.mobile.focusPage( $to );

                    // Set to page height
                    $to.height( screenHeight + toScroll );
                    
                    scrollPage();
                    
                    if( !none ){
                        $to.animationComplete( doneIn );
                    }

                    $to
                        .removeClass( toPreClass )
                        .addClass( name + " in" + reverseClass );
                    
                    if( none ){
                        doneIn();
                    }
                    
                },
            
                doneIn = function() {
                
                    if ( !sequential ) {
                        
                        if( $from ){
                            cleanFrom();
                        }
                    }
                
                    $to
                        .removeClass( "out in reverse " + name )
                        .height( "" );
                    
                    toggleViewportClass();
                    
                    // In some browsers (iOS5), 3D transitions block the ability to scroll to the desired location during transition
                    // This ensures we jump to that spot after the fact, if we aren't there already.
                    if( $( window ).scrollTop() !== toScroll ){
                        scrollPage();
                    }

                    deferred.resolve( name, reverse, $to, $from, true );
                };

            toggleViewportClass();
        
            if ( $from && !none ) {
                startOut();
            }
            else {
                doneOut();
            }

            return deferred.promise();
        };
    }

    // generate the handlers from the above
    var sequentialHandler = createHandler(),
        simultaneousHandler = createHandler( false );

    // Make our transition handler the public default.
    $.mobile.defaultTransitionHandler = sequentialHandler;

    //transition handler dictionary for 3rd party transitions
    $.mobile.transitionHandlers = {
        "default": $.mobile.defaultTransitionHandler,
        "sequential": sequentialHandler,
        "simultaneous": simultaneousHandler
    };

    // Use the simultaneous transition handler for slide transitions
    $.mobile.transitionHandlers.slide = $.mobile.transitionHandlers.simultaneous;

    // This should set the transitionFallbacks
    $.mobile.transitionFallbacks.fade       = "fade";
    $.mobile.transitionFallbacks.pop        = "fade";
    $.mobile.transitionFallbacks.flip       = "fade";
    $.mobile.transitionFallbacks.turn       = "fade";
    $.mobile.transitionFallbacks.flow       = "fade";
    $.mobile.transitionFallbacks.slidefade  = "fade";
    $.mobile.transitionFallbacks.slide      = "fade";
    $.mobile.transitionFallbacks.slideup    = "fade";
    $.mobile.transitionFallbacks.slidedown  = "fade";*/

}