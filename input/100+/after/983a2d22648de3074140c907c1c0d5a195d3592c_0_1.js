function( options, settings, parameters, selectors ) {



            if ((typeof options != 'undefined') && (options != '')) {



                this._widgetState.busy = false;

                this._widgetState.done = false;



                // Get the defaultSettings and extend / merge / override them with user defined settings 

                this._settings = $.extend( true, this._settings, this._defaultSettings );

                this._settings = $.extend( true, this._settings, settings );



                if (( typeof this._settings.mainId !== 'undefined') && ( this._settings.mainId !== "")) {



                    this._defaultSelectors.main = '#'+this._settings.mainId;

                    this._defaultSelectors.single = '#'+this._settings.mainId+' li';

                    this._defaultSelectors.bottom = '[data-role="list-divider"]';

                }



                if (( typeof this._settings.pageId !== 'undefined') && ( this._settings.pageId !== "")) {

                

                    this._settings.totalHeight = $("#"+this._settings.pageId).height();

                }



                // Get the defaultSelectors and extend / merge / override them with user defined selectors 

                this._selectors = $.extend( true, this._selectors, this._defaultSelectors );

                this._selectors = $.extend( true, this._selectors, selectors );



                // Get the defaultParameters and extend / merge / override them with user defined parameters 

                this._parameters = $.extend( true, this._parameters, this._defaultParameters );

                this._parameters = $.extend( true, this._parameters, parameters );



                // Get any user defined settings and extend / merge / override them with defaultSettings

                this.options = $.extend( true, this.options, this._defaultOptions );

                this.options = $.extend( true, this.options, options );



                // Get the pageId for the settings that were passed in by the user

                var newPageId = settings.pageId;



                // Make sure a pageId was passed in

                if ( ( typeof newPageId != 'undefined ') && ( newPageId != '' ) ) {



                    // First check to see if we are already tracking an instance for the page being re-initialized before storing the defaults

                    if (!this._instances[newPageId]) {



                        // create a copy to be stored along with the instance

                        optionsAsString = JSON.stringify(this.options);



                        // retrieve the template from the DOM so we can store it along with the instance 

                        if (( typeof this._settings.templateId != 'undefined' ) && ( this._settings.templateId != '') ) {



                            // retrieve the template from the DOM

                            var template = $( "#"+this._settings.templateId ).html();



                            var templateType = "";



                            var templatePrecompiled = this._settings.templatePrecompiled;



                            if (( typeof this._settings.templateType != 'undefined' ) && ( this._settings.templateType != '') ) {



                                templateType = this._settings.templateType;

                            }



                            // Dust templates seem to be the only ones that can be pre-compiled at initialization and then loaded when needed at runtime

                            if ( ( templateType === "dust" ) && ( template !== "" ) && ( !templatePrecompiled ) ) {



                                // add the pre-compiled template to the settings object

                                this._settings.template = dust.compile( template, this._settings.templateId );                        



                            } else {



                                // add it to the settings object

                                this._settings.template = template; 

                            }

                        }



                        // create a copy to be stored along with the instance

                        settingsAsString = JSON.stringify(this._settings);



                        // create a copy to be stored along with the instance

                        selectorsAsString = JSON.stringify(this._selectors);



                        // initialize a new object for this newPageId

                        this._instances[newPageId] = [];



                        // Store the merged options object as a new instance for later modifications and retrieval

                        this._instances[newPageId]['options'] = $.parseJSON(optionsAsString);



                        // Store the merged settings object as a new instance for later retrieval

                        this._instances[newPageId]['settings'] = $.parseJSON(settingsAsString);



                        // Store the merged selectors object as a new instance for later retrieval

                        this._instances[newPageId]['selectors'] = $.parseJSON(selectorsAsString);

                    }

                }

            }

        }