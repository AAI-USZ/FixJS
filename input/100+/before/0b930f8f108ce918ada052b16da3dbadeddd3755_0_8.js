function addField(field) {
                    var query = [
                        'ALTER TABLE',
                        '   "'+name+'"',
                        'ADD'
                    ];
                    if (field.autoIncrement) {
                        query.push('    "' + field.name + '" ' + field.type);
						SQL.update('CREATE SEQUENCE "'+name+'_' + field.name + '_SEQ"');
                    }
                    else if (field.type == 'varchar') {
                        query.push('    "' + field.name + '" varchar(' + field.size + ')');
                    }
                    else {
                        query.push('    "' + field.name + '" ' + field.type);
                    }
                    SQL.update(query);
                }