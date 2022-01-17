function( success, data ) {
            if ( success ) {
                var section = sakai.config.Profile.configuration.defaultConfig[ widgetData.sectionid ];

                if ( section ) {
                    var template = $displayprofilesection_view_template;
                    if ( editing ) {
                        template = $displayprofilesection_edit_template;
                    }

                    // Render header
                    var pageTitle = section.label;
                    if (!editing && section.altLabel) {
                        pageTitle = sakai.api.i18n.General.process(section.altLabel)
                            .replace('${user}', sakai.api.User.getFirstName(sakai_global.profile.main.data));
                    }
                    var headerHTML = sakai.api.Util.TemplateRenderer( $displayprofilesection_header_template, {
                        pageTitle: pageTitle
                    });
                    $displayprofilesection_header.html( sakai.api.i18n.General.process( headerHTML ) );

                    // If it is a multiple section, we have to render it with some love
                    if ( section.multiple ) {
                        renderMultiSection( template, section, data );
                    } else {
                        // data[widgetData.sectionid] won't exist when the user hasn't logged in before
                        if (editing || (data[widgetData.sectionid] && sectionHasElements(data[widgetData.sectionid].elements))) {
                            sectionData = data[ widgetData.sectionid ] && data[ widgetData.sectionid ].elements ? data[ widgetData.sectionid ].elements : false;
                            $.each(section.elements, function(index, element) {
                                if (element.altLabel) {
                                    element.altLabel = sakai.api.i18n.General.process(section.altLabel)
                                        .replace('${user}', sakai.api.User.getFirstName(sakai_global.profile.main.data));
                                }
                            });
                            var bodyHTML = sakai.api.Util.TemplateRenderer( template, {
                                sectionid: widgetData.sectionid,
                                section: section,
                                data: sectionData,
                                unique: false,
                                sakai: sakai
                            });
                            $displayprofilesection_body.html( sakai.api.i18n.General.process( bodyHTML ) );
                            var $tagfield = $displayprofilesection_body.find( "textarea[data-tag-field]" );
                            if ( $tagfield.length ) {
                                allowUpdate = false;
                                var autoSuggestOptions = {
                                    scrollHeight: 120,
                                    selectionAdded: function() {
                                        enableUpdate();
                                    },
                                    selectionRemoved: function(elem) {
                                        elem.remove();
                                        enableUpdate();
                                    }
                                };
                                var initialTagsValue = sectionData["sakai:tags"] && sectionData["sakai:tags"].value ? sectionData["sakai:tags"].value : false;
                                sakai.api.Util.AutoSuggest.setupTagAndCategoryAutosuggest(
                                    $tagfield,
                                    autoSuggestOptions,
                                    $('.list_categories', $rootel),
                                    initialTagsValue,
                                    function() {
                                        allowUpdate = true;
                                    }
                                );
                            }
                        } else {
                            renderEmptySection( data, section );
                        }
                    }

                    if ( editing ) {
                        $form = $( "#displayprofilesection_form_" + widgetData.sectionid, $rootel );
                        var validateOpts = {
                            submitHandler: saveValues,
                            messages: {}
                        };
                        // Set the custom error messages per field
                        $.each( section.elements, function( i, elt ) {
                            if ( elt.errorMessage ) {
                                validateOpts.messages[ i ] = {
                                    required: sakai.api.i18n.General.process( elt.errorMessage )
                                };
                            }
                        });
                        sakai.api.Util.Forms.validate( $form, validateOpts );
                    }
                }
            }
        }