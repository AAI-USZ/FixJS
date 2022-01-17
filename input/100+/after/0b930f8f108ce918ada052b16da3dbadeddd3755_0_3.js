function(field) {
                    if (field.name.length > 29) {
                        throw new Error('Oracle field names limited to 30 characters');
                    }
                    if (!field.reserved) {
                        if (field.autoIncrement) {
                            primaryKey = field.name;
                            query.push('    "' + field.name + '" ' + field.type + ',');
                            SQL.update('CREATE SEQUENCE '+sequenceName(name, field.name));
                        }
                        else if (field.type.toLowerCase().substr(0,7) === 'varchar') {
                            query.push('    "' + field.name + '" ' + field.type + '(' + field.size + '),');
                        }
                        else {
                            query.push('    "' + field.name + '" ' + field.type + ',');
                        }
                    }
                }