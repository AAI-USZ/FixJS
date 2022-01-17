function addField(field) {
                    var query = [
                        'ALTER TABLE',
                        '   "'+name+'"',
                        'ADD'
                    ];
                    if (field.autoIncrement) {
                        query.push('    "' + field.name + '" ' + field.type);
                        SQL.update('CREATE SEQUENCE '+ sequenceName(name, field.name));
                    }
                    else if (field.type == 'varchar') {
                        query.push('    "' + field.name + '" varchar(' + field.size + ')');
                    }
                    else {
                        query.push('    "' + field.name + '" ' + field.type);
                    }
                    SQL.update(query);
                }