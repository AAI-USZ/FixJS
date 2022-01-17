function (tr) {
                var classname = 'drop-into-' + tr.id.split('-')[1] + '-' + col.id.split('-')[1];
                tr.down('td', col.up().childElements().indexOf(col)).select('.cardwall_board_postit').invoke('removeClassName', classname);
            }