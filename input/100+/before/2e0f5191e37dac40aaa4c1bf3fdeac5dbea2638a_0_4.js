function col_def(my_field) {
                var col_id = prefix + hint + '_' + my_field.name;
                var dataobj = hint;
                var datafield = my_field.name;
                if (column_extras) {
                    if (column_extras['*']) {
                        if (column_extras['*']['dataobj']) {
                            dataobj = column_extras['*']['dataobj'];
                        }
                    }
                    if (column_extras[col_id]) {
                        if (column_extras[col_id]['dataobj']) {
                            dataobj = column_extras[col_id]['dataobj'];
                        }
                        if (column_extras[col_id]['datafield']) {
                            datafield = column_extras[col_id]['datafield'];
                        }
                    }
                }
                var def = {
                    'id' : col_id,
                    'label' : my_field.label || my_field.name,
                    'sort_type' : [ 'int', 'float', 'id', 'number' ].indexOf(my_field.datatype) > -1 ? 'number' : 
                        ( my_field.datatype == 'money' ? 'money' : 
                        ( my_field.datatype == 'timestamp' ? 'date' : 'default')),
                    'hidden' : my_field.virtual || my_field.datatype == 'link',
                    'flex' : 1
                };                    
                // my_field.datatype => bool float id int interval link money number org_unit text timestamp
                if (my_field.datatype == 'link') {
                    def.render = function(my) { 
                        return typeof my[dataobj][datafield]() == 'object' ? my[dataobj][datafield]()[my_field.key]() : my[dataobj][datafield](); 
                    }
                } else {
                    def.render = function(my) { return my[dataobj][datafield](); }
                }
                if (my_field.datatype == 'timestamp') {
                    JSAN.use('util.date');
                    def.render = function(my) {
                        return util.date.formatted_date( my[dataobj][datafield](), '%{localized}' );
                    }
                }
                if (my_field.datatype == 'org_unit') {
                    def.render = function(my) {
                        return typeof my[dataobj][datafield]() == 'object' ? my[dataobj][datafield]().shortname() : data.hash.aou[ my[dataobj][datafield]() ].shortname();
                    }
                }
                if (my_field.datatype == 'money') {
                    JSAN.use('util.money');
                    def.render = function(my) {
                        return util.money.sanitize( my[dataobj][datafield]() );
                    }
                }
                if (column_extras) {
                    if (column_extras['*']) {
                        for (var attr in column_extras['*']) {
                            def[attr] = column_extras['*'][attr];
                        }
                        if (column_extras['*']['expanded_label']) {
                            def.label = my_class.label + ': ' + def.label;
                        }
                        if (column_extras['*']['label_prefix']) {
                            def.label = column_extras['*']['label_prefix'] + def.label;
                        }
                        if (column_extras['*']['remove_virtual']) {
                            if (my_field.virtual) {
                                def.remove_me = true;
                            }
                        }
                    }
                    if (column_extras[col_id]) {
                        for (var attr in column_extras[col_id]) {
                            def[attr] = column_extras[col_id][attr];
                        }
                        if (column_extras[col_id]['keep_me']) {
                            def.remove_me = false;
                        }
                        if (column_extras[col_id]['label_prefix']) {
                            def.label = column_extras[col_id]['label_prefix'] + def.label;
                        }
                    }
                }
                if (def.remove_me) {
                    dump('Skipping ' + def.label + '\n');
                    return null;
                } else {
                    dump('Defining ' + def.label + '\n');
                    return def;
                }
            }