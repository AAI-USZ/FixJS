function(name) {
                var schema = getSchema(name);

                // table exists, alter the table if necessary
                var existing = Schema.getFromTable(name);

                function fieldTypeCompare(srcField, dstField) {
                    if (srcField.type === dstField.type) {
                        if (srcField.type === 'varchar' && srcField.size == dstField.size) {
                            return true;
                        }
                        else if (srcField.type == 'int') {
                            if (srcField.autoIncrement == dstField.autoIncrement) {
                                return true;
                            }
                        }
                        else {
                            return true;
                        }
                    }
                    return false;
                }

				function changeField(srcField, dstField) {
					var query = [
						'ALTER TABLE',
						'	"'+name+'"',
						'MODIFY ('
					];
					if (srcField.type.toLowerCase() === 'varchar') {
						query.push('	"'+srcField.name+'" ' + srcField.type + '(' + srcField.size + ')');
					}
					else {
						query.push('	"'+srcField.name+'" ' + srcField.type);
					}
					query.push(')');
					SQL.update(query);
				}
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

                // index source fields
                var srcFields = {};
                schema.fields.each(function(field) {
                    if (!field.reserved) {
                        srcFields[field.name] = field;
                    }
                });

                // index destination fields
                var dstFields = {};
                existing.fields.each(function(field) {
                    dstFields[field.name] = field;
                });
                function findDstField(srcField) {
                    for (var i in dstFields) {
                        if (fieldTypeCompare(srcField, dstFields[i])) {
                            return dstFields[i];
                        }
                    }
                    return false;
                }

                var fieldsProcessed = {};
                // match up schema fields with existing fields and process them
                srcFields.each(function(srcField) {
                    var dstField = dstFields[srcField.name];
                    if (dstField) {
                        // there is a field in the schema with same name as in the database
                        if (srcField.type.toLowerCase() !== dstField.type.toLowerCase()) {
                            // need to alter the table/field type
                            // console.dir(srcField);
                            // console.dir(dstField);
                            changeField(srcField, dstField);
                        }
						else if (srcField.type.toLowerCase() === 'varchar' && srcField.size !== dstField.size) {
							changeField(srcField, dstField);
						}
                        delete dstFields[srcField.name];
                        fieldsProcessed[srcField.name] = srcField;
                    }
                });

                // look at remaining schema fields to see if existing fields are being renamed
                srcFields.each(function(srcField) {
                    if (fieldsProcessed[srcField.name]) {
                        return;
                    }
                    var dstField = findDstField(srcField);
                    if (dstField) {
                        // rename existing field
                        renameField(srcField, dstField);
                        delete dstFields[dstField.name];
                        fieldsProcessed[srcField.name] = srcField;
                    }
                });

                // remove remaining destination fields
                dstFields.each(function(dstField) {
                    SQL.update([
                        'ALTER TABLE',
                        '   "' + name + '"',
                        'DROP COLUMN',
                        '   "' + dstField.name + '"'
                    ]);
                });

                // add any remaining source fields
                srcFields.each(function(srcField) {
                    if (fieldsProcessed[srcField.name]) {
                        return;
                    }
                    addField(srcField);
                });

                if (existing.primaryKey && !schema.primaryKey) {
                    SQL.update([
                        'ALTER TABLE',
                        '   "' + name + '"',
                        'DROP',
                        '   PRIMARY KEY'
                    ]);
                }
                else if (schema.primaryKey && !existing.primaryKey) {
                    // SQL.update('ALTER TABLE "'+name +'" ADD ( CONSTRAINT "'+primaryKey+'_PK" PRIMARY KEY ("'+primaryKey+'"))');
                    SQL.update([
                        'ALTER TABLE',
                        '   "' + name + '"',
                        'ADD (',
                        '   CONSTRAINT "' + schema.primaryKey  + '_pk" PRIMARY KEY ("' + schema.primaryKey + '")',
                        ')'
                    ]);
                }
                else if (schema.primaryKey && schema.primaryKey !== existing.primaryKey) {
					SQL.update([
						'ALTER TABLE',
						'	"' + name + '"',
						'RENAME CONSTRAINT',
						'	"' + existing.primaryKey + '_PK" TO "' + schema.primaryKey + '_PK"'
					]);
                }

                var existingIndexes = {};
                if (existing.indexes) {
                    existing.indexes.each(function(index) {
                        existingIndexes[index] = true;
                    });
                }
                var newIndexes = [];
                if (schema.indexes) {
                    schema.indexes.each(function(index) {
                        if (existingIndexes[index]) {
                            delete existingIndexes[index];
                        }
                        else {
                            newIndexes.push(index);
                        }
                    });
                }
                // delete old indexes not in the schema
                existingIndexes.each(function(tf, index) {
                    SQL.update('DROP INDEX ' + index.replace(/,/g, '_'));
                });
                newIndexes.each(function(index) {
					SQL.update('CREATE INDEX "' +  name + '_' + index + '_idx" ON "' + name +'" ("' + index + '")');
                });
            }