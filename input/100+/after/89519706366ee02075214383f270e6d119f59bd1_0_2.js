function (data) {
            var html = [],
                len,
                current_uid,
                item_number = 0,
                folder_html = [],
                item_html = [],
                thumb_name = self.editor.settings.thumbnail_size[0],
                thumb_width = self.editor.settings.thumbnail_size[1],
                thumb_height = self.editor.settings.thumbnail_size[2],
                col_items_number = self.editor.settings.num_of_thumb_columns;

            if (data.items.length === 0) {
                html.push('<div id="no-items">' + self.labels.label_no_items + '</div>');
            } else {
                jq.each(data.items, function (i, item) {
                    if (item.url === self.current_link && self.editor.settings.link_using_uids) {
                        self.current_link = 'resolveuid/' + item.uid;
                    }
                    switch (jq('#general_panel .legend .current', document).attr('id')) {
                        // TODO: use jquery dom to be sure stuff is closed
                        case 'listview':
                            if (item.is_folderish) {
                                folder_html.push('<div class="list item folderish ' + (i % 2 === 0 ? 'even' : 'odd') + '">');
                                if (self.is_link_plugin === true) {
                                    jq.merge(folder_html, [
                                        '<input href="' + item.url + '" ',
                                            'type="radio" class="noborder" style="margin: 0; width: 16px" name="internallink" value="',
                                            'resolveuid/' + item.uid ,
                                            '"/> '
                                    ]);
                                } else {
                                    folder_html.push('<img src="img/arrow_right.png" />');
                                }
                                jq.merge(folder_html, [
                                        item.icon,
                                        '<a href="' + item.url + '" class="folderlink contenttype-' + item.normalized_type + '">',
                                            item.title,
                                        '</a>',
                                    '</div>'
                                ]);
                            } else {
                                jq.merge(item_html, [
                                    '<div class="item list ' + (i % 2 === 0 ? 'even' : 'odd') + '" title="' + item.description + '">',
                                        '<input href="' + item.url + '" ',
                                            'type="radio" class="noborder" style="margin: 0; width: 16px" name="internallink" value="',
                                            'resolveuid/' + item.uid ,
                                            '"/> ',
                                        item.icon,
                                        '<span class="contenttype-' + item.normalized_type + '">' + item.title + '</span>',
                                    '</div>'
                                ]);
                            }
                            break;
                        case 'thumbview':
                            if (item_number % col_items_number === 0) {
                                item_html.push('<div class="row">');
                            }

                            if (item.is_folderish) {
                                jq.merge(item_html, [
                                    '<div class="width-1:' + col_items_number + ' cell position-' + item_number % col_items_number * (16 / col_items_number) + '">',
                                        '<div class="thumbnail item folderish" title="' + item.description +  '">',
                                            '<div style="width: ' + thumb_width + 'px; height: ' + thumb_height + 'px" class="thumb">',
                                                '<img src="img/folder_big.png" alt="' + item.title + '" />',
                                            '</div>',
                                            '<a href="' + item.url + '">',
                                                item.title,
                                            '</a>',
                                        '</div>',
                                    '</div>'
                                ]);
                            } else {
                                jq.merge(item_html, [
                                    '<div class="width-1:' + col_items_number + ' cell position-' + item_number % col_items_number * (16 / col_items_number) + '">',
                                        '<div class="thumbnail item" title="' + item.description +  '">',
                                            '<div style="width: ' + thumb_width + 'px; height: ' + thumb_height + 'px" class="thumb">',
                                                '<img src="' + item.url + '/@@images/image/' + thumb_name + '" alt="' + item.title + '" />',
                                            '</div>',
                                            '<p>' + item.title + '</p>',
                                            '<input href="' + item.url + '" ',
                                                'type="radio" class="noborder" name="internallink" value="',
                                                'resolveuid/' + item.uid,
                                                '"/> ',
                                        '</div>',
                                    '</div>'
                                ]);
                            }
                        
                            if (item_number % col_items_number === col_items_number - 1) {
                                item_html.push('</div>');
                            }
                            item_number++;
                            break;
                    }
                    

                });
            }
            jq.merge(html, folder_html);
            jq.merge(html, item_html);
            jq('#internallinkcontainer', document).html(html.join(''));

            // display shortcuts
            if (self.is_search_activated === false && self.shortcuts_html.length) {
                
                jqShortcutsBtn = jq('#shortcutsicon', document);
                jqShortcutsView = jq('#shortcutsview', document);
                jqShortcutItem = jq('#shortcutsview #item-template', document);
                
                jqShortcutsBtn.attr('title', self.labels.label_shortcuts);
                
                jq.each(self.shortcuts_html, function () {
                    jqItem = jqShortcutItem.clone();
                    jqItem.append(''+this);
                    jqItem.removeAttr('id');
                    jqItem.appendTo(jqShortcutsView);
                });
                jqShortcutItem.remove();

            }

            // make rows clickable
            jq('#internallinkcontainer div.item', document).click(function() {
                var el = jq(this),
                    checkbox = el.find('input');
                if (checkbox.length > 0) {
                    checkbox.click();
                } else {
                    el.find('a').click();
                }
            });

            // breadcrumbs
            html = [];
            len = data.path.length;
            jq.each(data.path, function (i, item) {
                if (i > 0) {
                    html.push(" &rarr; ");
                }
                html.push(item.icon);
                if (i === len - 1) {
                    html.push('<span>' + item.title + '</span>');
                } else {
                    html.push('<a href="' + item.url + '">' + item.title + '</a>');
                }
            });
            jq('#internalpath', document).html(html.join(''));

            // folder link action
            jq('#internallinkcontainer a, #internalpath a, #shortcutsview a', document).click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.getFolderListing(jq(this).attr('href'), self.method_folderlisting);
            });
            // item link action
            jq('#internallinkcontainer input:radio', document).click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                self.setDetails(jq(this).attr('href'));
            });

            // Make the image upload form upload the image into the current container.
            jq('#upload_form', document).attr('action', context_url + '/tinymce-upload');

            // Select image if we are updating existing one
            if (self.editing_existing_image === true) {
                self.editing_existing_image = false;
                if (self.current_link.indexOf('resolveuid/') > -1) {
                    current_uid = self.current_link.split('resolveuid/')[1];
                    jq.ajax({
                        'url': self.editor.settings.portal_url + '/portal_tinymce/tinymce-getpathbyuid?uid=' + current_uid,
                        'dataType': 'text',
                        'success': function(text) {
                            self.setDetails(self.getAbsoluteUrl(self.editor.settings.document_base_url, text));
                        }
                        // TODO: handle 410 (image was deleted)
                    });
                } else {
                    self.setDetails(self.current_link);
                }
            }
            self.displayPanel('browse', data.upload_allowed);

            // Handle search
            if (self.is_search_activated === true) {
                jq('#internalpath', document).prev().text(self.labels.label_search_results);
            } else {
                jq('#internalpath', document).prev().text(self.labels.label_internal_path);
            }
        }