function renameField(srcField, dstField) {
                    var query = [
                        'ALTER TABLE',
                        '   "'+name+'"',
                        'RENAME COLUMN'
                    ];
                    if (srcField.autoIncrement) {
                        query.push('    "' + dstField.name + '" TO "' + srcField.name + '"'); //  + ' auto_increment');
                        if (!SQL.getScalar('SELECT COUNT(*) FROM user_sequences WHERE sequence_name=' + SQL.quote(sequenceName(name, dstField.name)))) {
                            SQL.update('CREATE SEQUENCE '+sequenceName(name, srcField.name));
                        }
                        else {
                            SQL.update('RENAME ' + sequenceName(name, dstField.name) + ' TO ' + sequenceName(name, srcField.name));
                        }
                    }
                    else if (srcField.type == 'varchar') {
                        query.push('    "' + dstField.name + '" TO "' + srcField.name + '"');
                    }
                    else {
                        query.push('    "' + dstField.name + '" TO "' + srcField.name + '"');
                    }
                    SQL.update(query);
                }