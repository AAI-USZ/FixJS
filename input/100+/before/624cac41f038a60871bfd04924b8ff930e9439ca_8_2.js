function(el, offset) {
                var $el = sakai_util.getJqueryObject(el);

                var dialogOffset = 50;
                if (offset && $.isNumeric(offset)) {
                    dialogOffset = parseInt(offset, 10);
                }

                var htmlScrollPos = parseInt($('html').scrollTop(), 10);
                var docScrollPos = parseInt($(document).scrollTop(), 10);
                if (htmlScrollPos > 0) {
                    $el.css({'top': htmlScrollPos + dialogOffset + 'px'});
                } else if (docScrollPos >= 0) {
                    $el.css({'top': docScrollPos + dialogOffset + 'px'});
                }
            }