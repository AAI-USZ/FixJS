function(field) {
                    if (!field.reserved) {
                        if (field.autoIncrement) {
                            primaryKey = field.name;
                            query.push('    "' + field.name + '" ' + field.type + ',');
							SQL.update('CREATE SEQUENCE "'+name+'_' + field.name + '_SEQ"');
                        }
                        else if (field.type === 'varchar') {
                            query.push('    "' + field.name + '" varchar(' + field.size + '),');
                        }
                        else {
                            query.push('    "' + field.name + '" ' + field.type + ',');
                        }
                    }
                }