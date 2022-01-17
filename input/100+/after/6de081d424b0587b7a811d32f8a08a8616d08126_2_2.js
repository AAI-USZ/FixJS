function(items, total) {
                if (total && query && query !== '*') {
                    $mylibrary_result_count.show();
                    var resultLabel = sakai.api.i18n.getValueForKey('RESULTS');
                    if (total === 1) {
                        resultLabel = sakai.api.i18n.getValueForKey('RESULT');
                    }
                    $mylibrary_result_count.children('.s3d-search-result-count-label').text(resultLabel);
                    $mylibrary_result_count.children('.s3d-search-result-count-count').text(total);
                }
                if (!sakai.data.me.user.anon) {
                    if (total !== 0) {
                        $('.s3d-page-header-top-row', $rootel).show();
                        $('.s3d-page-header-bottom-row', $rootel).show();
                    } else {
                        $('.s3d-page-header-bottom-row', $rootel).hide();
                    }
                } else {
                    if (total !== 0) {
                        $('.s3d-page-header-top-row', $rootel).show();
                    }
                }
                return sakai.api.Util.TemplateRenderer('mylibrary_items_template', {
                    'items': items,
                    'sakai': sakai,
                    'isMe': mylibrary.isOwnerViewing
                });
            }