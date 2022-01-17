function(index, item) {
                        if (!$(item).is(':disabled')) {
                            var viewers = [];
                            if ($(item).data('sakai-pooled-content-viewer')) {
                                viewers = ('' + $(item).data('sakai-pooled-content-viewer')).split(',');
                            }
                            var managers = [];
                            if ($(item).data('sakai-pooled-content-manager')) {
                                managers = ('' + $(item).data('sakai-pooled-content-manager')).split(',');
                            }
                            var contentObj = {
                                'sakai:pooled-content-file-name': $(item).next().text(),
                                'sakai:pooled-content-viewer': viewers,
                                'sakai:pooled-content-manager': managers,
                                '_path': item.id,
                                '_mimeType': $(item).data('mimetype'),
                                'canshare': $(item).attr('data-canshare'),
                                'type': 'existing',
                                'css_class': $(item).next().children(newaddcontentExistingItemsListContainerListItemIcon)[0].id
                            };
                            addContentToQueue(contentObj);
                            $(item).attr('disabled', 'disabled');
                            $(item).parent().addClass(newaddcontentExistingItemsListContainerDisabledListItem);
                        }
                    }