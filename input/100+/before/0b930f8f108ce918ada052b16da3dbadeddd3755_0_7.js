function renameField(srcField, dstField) {
                    var query = [
                        'ALTER TABLE',
                        '   "'+name+'"',
                        'RENAME COLUMN'
                    ];
                    if (srcField.autoIncrement) {
                        query.push('    "' + dstField.name + '" TO "' + srcField.name + '"'); //  + ' auto_increment');
						if (!SQL.getScalar('SELECT COUNT(*) FROM user_sequences WHERE sequence_name=' + SQL.quote(name + '_' + dstField.name + '_SEQ'))) {
							SQL.update('CREATE SEQUENCE "'+name+'_' + srcField.name + '_SEQ"');
						}
						else {
							SQL.update('RENAME "' + name + '_' + dstField.name + '_SEQ" TO "' + name + '_' + srcField.name + '_SEQ"');
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