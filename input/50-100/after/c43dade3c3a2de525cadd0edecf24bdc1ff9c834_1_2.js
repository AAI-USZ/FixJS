function(cell, record, column, data) {
            var url = record.getData('thumbnail_url');
            if (url) {
                var thBack = 'background: url(' + url + ') no-repeat;';
                var thWidth = ' width: ' + record.getData('thumbnail_width') + 'px;';
                var thHeight = ' height: ' + record.getData('thumbnail_height') + 'px;';
                cell.innerHTML = '<div class="thumbview"><div id="thumbfield" class="thumbfield"></div><span><div style="' + thBack + thWidth + thHeight + '"></div></span></div>';
            }
            else {
                cell.innerHTML = '';
            }
        }