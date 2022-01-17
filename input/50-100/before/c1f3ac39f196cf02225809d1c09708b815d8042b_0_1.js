function (tr, row_index) {
                var classname = 'drop-into-' + row_index + '-' + col.id.split('-')[1];
                tr.down('td', col.up().childElements().indexOf(col)).select('.cardwall_board_postit').invoke('removeClassName', classname);
            }