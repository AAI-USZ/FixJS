function(index,item) {
            if (item == 'collapsed') {
                $nodeRow.nextAll('tr').css('display', 'none');
                    $nodeRow.removeClass('expanded');
                    $nodeRow.addClass('contracted');
                    $nodeDiv.css('cursor','s-resize');
            } else {
                $nodeDiv.addClass(item);
            }
        }