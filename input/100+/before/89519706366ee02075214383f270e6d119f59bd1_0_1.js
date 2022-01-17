function () {
    var self = this,
        selected_node = jq(this.editor.selection.getNode(), document),
        scaled_image,
        mailaddress,
        mailsubject,
        href,
        current_uid;

    this.tinyMCEPopup.resizeToInnerSize();

    // Determine type of the plugin: link or image
    this.is_link_plugin = window.location.search.indexOf('plonelink') > -1;
    this.method_folderlisting = this.is_link_plugin ? 'tinymce-jsonlinkablefolderlisting' : 'tinymce-jsonimagefolderlisting';
    this.method_search = this.is_link_plugin ? 'tinymce-jsonlinkablesearch' : 'tinymce-jsonimagesearch';
    this.shortcuts_html = this.is_link_plugin ? self.editor.settings.link_shortcuts_html : self.editor.settings.image_shortcuts_html;

    // Setup events
    jq('#insert-selection', document).click( function (e) {
        e.preventDefault();
        if (self.is_link_plugin === true) {
            self.insertLink();
        } else {
            self.insertImage();
        }
    });
    jq('#cancel', document).click(function (e) {
        e.preventDefault();
        self.tinyMCEPopup.close();
    });
    jq('#upload', document).click(function (e) {
        e.preventDefault();
        self.displayPanel('upload');
    });
    jq('#uploadbutton', document).click(function (e) {
        e.preventDefault();
        jq('#upload_form', document).submit();
    });
    jq('#searchtext', document).keyup(function (e) {
        e.preventDefault();
        // We need to stop the event from propagating so that pressing Esc will
        // only stop the search but not close the whole dialog.
        e.stopPropagation();
        self.checkSearch(e);
    });
    jq('#clear-btn', document).click(function (e) {
        e.preventDefault();
        jq('#searchtext', document).val("");
        self.checkSearch(e);
    });
    jq('#search-btn', document).click(function (e) {
        e.preventDefault();
        self.checkSearch(e);
    });
    // handle different folder listing view types
    jq('#general_panel .legend a', document).click(function (e) {
        self.editing_existing_image = true;
        e.preventDefault();
        jq('#general_panel .legend a', document).removeClass('current');
        jq(this).addClass('current');
        // refresh listing with new view settings
        self.getFolderListing(self.folderlisting_context_url, self.folderlisting_method);
    });

    // setup UI based on settings
    if (!this.editor.settings.allow_captioned_images) {
        jq('#caption', document).parent().parent().hide();
    }
    if (this.editor.settings.rooted === true) {
        jq('#home', document).hide();
    }
    if (!this.editor.settings.enable_external_link_preview) {
        jq('#previewexternalurl', document).hide();
        jq('#previewexternal', document).parents('div.field').hide();
    }

    // setup UI depending on plugin type
    if (this.is_link_plugin === true) {
        // we may have image selected and anchor is the wrapping node
        selected_node = selected_node.closest('a');
        jq('#browseimage_panel h2', document).text(this.labels.label_browselink);
        jq('#addimage_panel h2', document).text(this.labels.label_addnewfile);
        jq('#linktype_panel', document).removeClass('hide');
        jq('#plonebrowser', document).removeClass('image-browser').addClass('link-browser');

        this.populateAnchorList();

        // display results as list and disable thumbs view
        jq('.legend a', document).removeClass('current');
        jq('#listview', document).addClass('current');
        jq('.legend', document).hide();
        jq('.action-icons', document).hide();

        // setup link buttons acions
        jq('#linktype a', document).click(function (e) {
            e.preventDefault();
            jq('#linktype_panel div', document).removeClass('current');
            jq(this, document).parent('div').addClass('current');
            switch (jq(this).attr('href')) {
                case "#internal":
                    self.displayPanel('browse');
                    self.getCurrentFolderListing();
                    break;
                case "#external":
                    self.displayPanel('external');
                    break;
                case "#email":
                    self.displayPanel('email');
                    break;
                case "#anchor":
                    self.displayPanel('anchor');
                    break;
            }
        });
        jq('#externalurl', document).keyup(function (e) {
            self.checkExternalURL(this.value);
        });
        jq('#targetlist', document).change(this.setupPopupVisibility);
        jq('#previewexternalurl', document).click(function (e) {
            e.preventDefault();
            self.previewExternalURL();
        });

        /* handle link plugin startup */
        if (selected_node.length > 0 && selected_node[0].nodeName.toUpperCase() === "A") {
            // element is anchor, we have a link
            href = jq.trim(selected_node.attr('href'));

            // setup form data
            if ((typeof(selected_node.attr('title')) !== "undefined")) {
                jq('#title', document).val(selected_node.attr('title'));
            }

            // determine link type
            if (href.indexOf('#') === 0) {
                jq('input:radio[value=' + href + ']', document).click();
                jq('#linktype a[href=#anchor]', document).click();
            } else if (href.indexOf('mailto:') > -1) {
                href = href.split('mailto:')[1].split('?subject=');
                if (href.length === 2) {
                    mailaddress = href[0];
                    mailsubject = href[1];
                } else {
                    mailaddress = href[0];
                    mailsubject = "";
                }

                jq('#mailaddress', document).val(mailaddress);
                jq('#mailsubject', document).val(mailsubject);
                jq('#linktype a[href=#email]', document).click();
            } else if ((href.indexOf(this.editor.settings.portal_url) === -1) &&
                ((href.indexOf('http://') === 0) || (href.indexOf('https://') === 0) || (href.indexOf('ftp://') === 0))) {
                this.checkExternalURL(href);
                jq('#linktype a[href=#external]', document).click();
            } else {
                if (href.indexOf('#') !== -1) {
                    href = href.split('#')[0];
                }
                // mark we are selecting an item in browser
                this.editing_existing_image = true;

                if (href.indexOf('resolveuid') !== -1) {
                    current_uid = href.split('resolveuid/')[1];
                    jq.ajax({
                        url: this.editor.settings.portal_url + '/portal_tinymce/tinymce-getpathbyuid?uid=' + current_uid,
                        dataType: 'text',
                        type: 'GET',
                        success: function(text) {
                            self.current_url = self.getAbsoluteUrl(self.editor.settings.document_base_url, text);
                            self.current_link = self.editor.settings.link_using_uids ? href : self.current_url;
                            self.getFolderListing(self.getParentUrl(self.current_url), 'tinymce-jsonlinkablefolderlisting');
                        }
                    });
                } else {
                    this.current_link = this.getAbsoluteUrl(this.editor.settings.document_base_url, href);
                    this.getFolderListing(this.getParentUrl(this.current_link), 'tinymce-jsonlinkablefolderlisting');
                }
            }

            jq('#targetlist', document).val(selected_node.attr('target'));
        } else {
            // plain text selection
            href = jq.trim(this.editor.selection.getContent());
            if ((href.indexOf('http://') === 0) || (href.indexOf('https://') === 0) || (href.indexOf('ftp://') === 0)) {
                this.checkExternalURL(href);
                jq('#linktype a[href=#external]', document).click();
            } else {
                this.getCurrentFolderListing();
            }
        }

    } else {
        /* handle image plugin startup */
        // jq('#browseimage_panel h2', document).text(this.labels.label_browseimage);
        jq('#addimage_panel h2', document).text(this.labels.label_addnewimage);
        jq('#plonebrowser', document).removeClass('link-browser').addClass('image-browser');
        jq('#linktarget', document).hide();

        if (selected_node.get(0).tagName && selected_node.get(0).tagName.toUpperCase() === 'IMG') {
            /** The image dialog was opened to edit an existing image element. **/
            this.editing_existing_image = true;

            // Manage the CSS classes defined in the <img/> element. We handle the
            // following classes as special cases:
            //   - captioned
            //   - image-inline
            //   - image-left
            //   - image-right
            // and pass all other classes through as-is.
            jq.each(selected_node.attr('class').split(/\s+/), function () {
                var classname = this.toString();
                switch (classname) {
                    case 'captioned':
                        if (self.editor.settings.allow_captioned_images) {
                            // Check the caption checkbox
                            jq('#caption', document).attr('checked', 'checked');
                        }
                        break;

                    case 'image-inline':
                    case 'image-left':
                    case 'image-right':
                        // Select the corresponding option in the "Alignment" <select>.
                        jq('#classes', document).val(classname);
                        break;

                    default:
                        // Keep track of custom CSS classes so we can inject them
                        // back into the element later.
                        self.current_classes.push(classname);
                        break;
                }
            });

            scaled_image = this.parseImageScale(selected_node.attr("src"));

            // Update the dimensions <select> with the corresponding value.
            jq('#dimensions', document).val(scaled_image.scale);

            if (scaled_image.url.indexOf('resolveuid/') > -1) {
                /** Handle UID linked image **/

                current_uid = scaled_image.url.split('resolveuid/')[1];

                // Fetch the information about the UID linked image.
                jq.ajax({
                    'url': this.editor.settings.portal_url + '/portal_tinymce/tinymce-getpathbyuid?uid=' + current_uid,
                    'dataType': 'text',
                    'type': 'GET',
                    'success': function (text) {
                        // Store the absolute URL to the UID referenced image
                        self.current_url = self.getAbsoluteUrl(self.editor.settings.document_base_url, text);
                        // Store the image link as UID or full URL based on policy
                        self.current_link = self.editor.settings.link_using_uids ? scaled_image.url : self.current_url;

                        self.getFolderListing(self.getParentUrl(self.current_url), 'tinymce-jsonimagefolderlisting');
                    }
                });
            } else {
                /** Handle directly linked image **/
                this.current_link = this.getAbsoluteUrl(this.editor.settings.document_base_url, scaled_image.url);
                this.getFolderListing(this.getParentUrl(this.current_link), 'tinymce-jsonimagefolderlisting');
            }
        } else {
            /** The image dialog was opened to add a new image. **/
            this.getCurrentFolderListing();
        }
    }
}