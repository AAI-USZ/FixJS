function(err, data) {
            for (var row in data.rows) {
                var board = data.rows[row].key.toLowerCase();
                var status = data.rows[row].value[0] ? data.rows[row].value[0] : 'none';
                var background = {
                    none: 'white',
                    gold: '#ffdd00',
                    silver: 'silver',
                    bad: 'f66',
                    bone: 'black'
                }[status];
                $('#' + board).css('background', background);

                if (board.substr(0,1) == 'd') {
                    var html = '';
                    for (var i=0; i<8; i++) {
                        html += '<span style="display:block;margin:0px;padding:0px;height:2px;width:2px;background:' + (data.rows[row].value[2][i].good ? 'green' : 'red') + ';"></span>';
                    }
                    $('#' + board).append(html);
                }
             }
        }