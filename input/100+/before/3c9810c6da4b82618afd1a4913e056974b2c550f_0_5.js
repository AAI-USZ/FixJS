function( more ){



                                                var count                       = more.data[0].count;

                                                var html                        = "";

                                                var json                        = "";

                                                var template                    = "";

                                                var templateId                  = "";

                                                var templateType                = "";

                                                var templatePrecompiled         = false; 

                                                var mainElementSelector         = "";

                                                var singleItemElementSelector   = "";

                                                var bottomElementSelector       = "";

                                                var $bottomElement              = "";



                                                if ( count > 0 ) {



                                                    mainElementSelector = $that._selectors.main;

                                                    singleItemElementSelector = $that._selectors.single;

                                                    bottomElementSelector = $that._selectors.bottom;



                                                    $bottomElement = $that._getBottomElement( mainElementSelector, bottomElementSelector );



                                                    if ( ( typeof more.data[0].html != 'undefined' ) && ( more.data[0].html != '' ) ) {

                                                    

                                                        html = more.data[0].html;



                                                        if ( $bottomElement ) {



                                                            $( singleItemElementSelector ).last().before( html );



                                                        } else {



                                                            $( mainElementSelector ).append( html );

                                                        } 

                                                    

                                                    } else {



                                                        // Check to see if there is already an instance of this page in memory

                                                        if ( $that._instances[$that._settings.pageId] ) {



                                                            // If a templateId isn't set, then there's no need to do the other two checks

                                                            if ( ( typeof $that._instances[$that._settings.pageId]['settings'].templateId != 'undefined' ) && ( $that._instances[$that._settings.pageId]['settings'].templateId != '' ) ) {



                                                                templateId = $that._instances[$that._settings.pageId]['settings'].templateId;

                                                            

                                                                if ( ( typeof $that._instances[$that._settings.pageId]['settings'].templateType != 'undefined' ) && ( $that._instances[$that._settings.pageId]['settings'].templateType != '' ) ) {



                                                                    templateType = $that._instances[$that._settings.pageId]['settings'].templateType;

                                                                }



                                                                if ( ( typeof $that._instances[$that._settings.pageId]['settings'].template != 'undefined' ) && ( $that._instances[$that._settings.pageId]['settings'].template != '' ) ) {



                                                                    template = $that._instances[$that._settings.pageId]['settings'].template;

                                                                }

                                                            }



                                                            templatePrecompiled = $that._instances[$that._settings.pageId]['settings'].templatePrecompiled;

                                                        

                                                        } else { // This should never happen ... but, just in case



                                                            if ( ( typeof $that._settings.templateId != 'undefined' ) && ( $that._settings.templateId != '') ) {



                                                                templateId = $that._settings.templateId;



                                                                if ( ( typeof $that._settings.templateType != 'undefined' ) && ( $that._settings.templateType != '') ) {



                                                                    templateType = $that._settings.templateType;

                                                                }



                                                                if ( ( typeof $that._settings.template != 'undefined' ) && ( $that._settings.template != '') ) {



                                                                    template = $that._settings.template;

                                                                }

                                                            }



                                                            templatePrecompiled = $that._settings.templatePrecompiled;

                                                        }



                                                        // Just to make sure we got something

                                                        if ( ( templateType !== "" ) && ( templateId !== "" ) && ( template !== "" ) ) {



                                                            // First check to see if json2html is being used since it needs special handling

                                                            if ( templateType === "json2html" ) {



                                                                json = more.data[0].json;



                                                                // first make sure there was a bottom element to work around

                                                                if ( $bottomElement ) {



                                                                    // we need to remove the last li if it's a divider so we can append the retrieved li items

                                                                    $bottomElement.remove();

                                                                }



                                                                // Transform the retrieved json data into HTML using the transform template that was set at re-initialization for this page

                                                                $( mainElementSelector ).json2html( json, $.parseJSON( template ) );



                                                                // first make sure there was a list-divider

                                                                if ( $bottomElement ) {



                                                                    // put the last li item back if it exists (it will exist if it was an list-divider)

                                                                    $( singleItemElementSelector ).last().append( $bottomElement );

                                                                }



                                                            } else {



                                                                json = more.data[0];



                                                                switch( templateType ) {



                                                                    case 'handlebars' :



                                                                        if ( templatePrecompiled ) {



                                                                            template = Handlebars.templates[templateId + '.tmpl']; // your template minus the .js

                

                                                                            html = template( json );



                                                                        } else {



                                                                            template = Handlebars.compile( template );



                                                                            html = template( json );

                                                                        }



                                                                        break;



                                                                    case 'icanhaz' :



                                                                        // Add the icanhaz template for this page

                                                                        ich.addTemplate( "listitem", template );



                                                                        // Convert the json record to HTML with icanhaz

                                                                        html = ich.listitem( json, true );



                                                                        // Clear the icanhaz cache 

                                                                        ich.clearAll();



                                                                        break;



                                                                    case 'dust' :



                                                                        if ( templatePrecompiled ) {



                                                                            // Should be no need to load the template source here since it's pre-compiled externally



                                                                            dust.render( templateId, json, function( err, result ) {

                                                                                // Append the item HTML onto the main HTML string

                                                                                html = result;

                                                                            } );



                                                                        } else {



                                                                            // Even if Dust templates aren't pre-compiled in an external script, they are still pre-compiled during initialization

                                                                            dust.loadSource( template );



                                                                            dust.render( templateId, json, function( err, result ) {

                                                                                // Append the item HTML onto the main HTML string

                                                                                html = result;

                                                                            } );

                                                                        }



                                                                        break;



                                                                    case 'dot' :



                                                                        template = doT.template( template );



                                                                        // Convert the json data to html with doT.js 

                                                                        html = template( json );



                                                                        break;



                                                                    default : 



                                                                        // Not sure if it makes sense to have a default here - we should probably raise an error instead

                                                                        break;

                                                                }



                                                                // First check for the bottom element to see if we need to insert the html before it

                                                                if ( $bottomElement ) {



                                                                    $( singleItemElementSelector ).last().before( html );



                                                                } else { // we can just append it



                                                                    $( mainElementSelector ).append( html );

                                                                }

                                                            }



                                                        } else {



                                                            // raise an error

                                                        }

                                                    }



                                                    // Refresh the listview so it is re-enhanced by JQM

                                                    $( mainElementSelector ).listview( 'refresh' );



                                                    count = parseInt( count );



                                                    var singleItemHeight = $( singleItemElementSelector ).first().next().height();



                                                    if ( $that._instances[$that._settings.pageId] ) {



                                                        var totalHeight = $that._instances[$that._settings.pageId]['settings'].totalHeight;



                                                        $that._instances[$that._settings.pageId]['settings'].totalHeight = ( totalHeight + ( singleItemHeight * count ) );



                                                    } else {



                                                        var totalHeight = $that._settings.totalHeight;



                                                        $that._settings.totalHeight = ( totalHeight + ( singleItemHeight * count ) );

                                                    }



                                                    // Increment the stored retrieved count only by the number of items retrieved

                                                    $that._instances[$that._settings.pageId]['options'].retrieved += count;



                                                    if ( ( count < $that.options.retrieve ) || ( $that.options.retrieve == "all" ) ) {



                                                        $that._widgetState.done = true;



                                                        // trigger an event to announce that the lazyloader is done loading this page

                                                        $that._triggerEvent( "alldone", "_load" );

                                                    }



                                                } else {



                                                    $that._widgetState.done = true;



                                                    // trigger an event to announce that the lazyloader is done loading this page

                                                    $that._triggerEvent( "alldone", "_load" );

                                                }



                                                $( "#"+$that._settings.progressDivId ).hide( 250, function() {



                                                    $that._widgetState.busy = false;

                                                } ); 



                                                // trigger an event to announce that the lazyloader is done loading that chunk

                                                $that._triggerEvent( "doneloading", "_load" );



                                            }