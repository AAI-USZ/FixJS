function(cell, record, column, data) {
            var th = record.getData('thumbnail_url');
            if (th)
                cell.innerHTML = '<div class="thumbview"><div id="thumbfield" class="thumbfield"></div><span><img src="' + th + '" /></span></div>';
            else
                cell.innerHTML = '';
        }