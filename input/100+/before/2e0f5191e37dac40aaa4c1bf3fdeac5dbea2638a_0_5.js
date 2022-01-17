function(row,cols) {
            // row contains { 'my' : { 'acp' : {}, 'circ' : {}, 'mvr' : {} } }
            // cols contains all of the objects listed above in columns

            var obj = {};
            JSAN.use('util.error'); obj.error = new util.error();
            JSAN.use('OpenILS.data'); obj.data = new OpenILS.data(); obj.data.init({'via':'stash'});
            JSAN.use('util.network'); obj.network = new util.network();
            JSAN.use('util.money');

            var my = row.my;
            var values = [];
            var cmd = '';
            try {
                for (var i = 0; i < cols.length; i++) {
                    switch (typeof cols[i].render) {
                        case 'function': try { values[i] = cols[i].render(my); } catch(E) { values[i] = error_value; obj.error.sdump('D_COLUMN_RENDER_ERROR',E); } break;
                        case 'string' : cmd += 'try { ' + cols[i].render + '; values['+i+'] = v; } catch(E) { values['+i+'] = error_value; }'; break;
                        default: cmd += 'values['+i+'] = "??? '+(typeof cols[i].render)+'"; ';
                    }
                }
                if (cmd) eval( cmd );
            } catch(E) {
                obj.error.sdump('D_WARN','map_row_to_column: ' + E);
                if (error_value) { value = error_value; } else { value = '   ' };
            }
            return values;
        }