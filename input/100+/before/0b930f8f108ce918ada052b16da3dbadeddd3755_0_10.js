function() {
        var phpjs = require('phpjs'),
            empty = phpjs.empty;

        var schemas = {};
        var onStartFuncs = [];

        /** @private */
        function getSchema(name) {
            if (Util.isString(name)) {
                var schema = schemas[name];
                if (!schema) {
                    throw new Error('No such schema ' + name);
                }
                return schema;
            }
            return name;
        }

        /**
         * @private
         *
         * get an appropriate defaultValue for given field
         * if defaultValue present in field, use it
         * otherwise return something appropriate to the field's type
         */
        function defaultValue(field) {
            if (field.defaultValue) {
                if (Util.isFunction(field.defaultValue)) {
                    return field.defaultValue();
                }
                return field.defaultValue;
            }
            switch (field.type) {
                case 'int':
                case 'tinyint':
                    return 0;
                default:
                    return '';
            }
        }

        /**
         * @private
         * Query a Schema for a row or rows by example
         *
         * @param {object} name name of Schema OR a Schema object
         * @param {object} example example to query
         * @param {boolean} single true to return a single row, otherwise all matching rows
         * @returns {object} A single row matching example, or all matching rows
         */
        function find(name, example, single) {
            var schema = getSchema(name);
            name = schema.name;
            example = example || {};
            var where = Schema.where(name, example);
            var query = [
                'SELECT',
                '       *',
                'FROM',
                '       "' + name + '"'
            ];
            if (where.length) {
                query.push('WHERE');
                query.push(where.join(' AND '));
            }
            if (single) {
                var ret = SQL.getDataRow(query);
                return empty(ret) ? false : Schema.onLoad(schema, ret);
            }
            else {
                return Schema.onLoad(schema, SQL.getDataRows(query));
            }
        }

        /** @private **/
        // onCreate functions are called at onStart time to assure all the tables
        // are created first.
        function onStart() {
            onStartFuncs.each(function(func) {
                func();
            });
        }

        if (global.Server) {
            global.Server.addOnStart({name: 'Schemas', func: onStart});
        }

        /** @scope Schema */
        return {
            /**
             * <p>Get all schemas in ExtJS DataStore/Record format.</p>
             */
             // getSchemaExtJs: function() {
             //     var extjs = {};
             //     schemas.each(function(schema) {
             //         var fields = [];
             //         schema.fields.each(function(field) {
             //             if (!field.serverOnly) {
             //                 switch (field.type) {
             //                     case 'int':
             //                     case 'tinyint':
             //                         fields.push({ name: field.name, type: 'int '});
             //                         break;
             //                     default:
             //                         fields.push({ name: field.name });
             //                 }
             //             }
             //         });
             //         extjs[schema.name] = fields;
             //     });
             //     return extjs;
             // },
            getSchemaExtJs: function() {
                var extjs = {};
                schemas.each(function(schema) {
                    var fields = [];
                    schema.fields.each(function(field) {
                      if (!field.serverOnly) {
                            var type = field.type;
                            switch (field.type) {
                                case 'int':
                                case 'tinyint':
                                    type = 'int';
                                    fields.push({ name: field.name, type: 'int '});
                                    break;
                                default:
                                    type = undefined;
                                    fields.push({ name: field.name });
                            }
                            var f = Util.apply({}, field);
                            f.type = type;
                            fields.push(f);
                        }
                    });
                    extjs[schema.name] = {
                        name: schema.name,
                        fields: fields,
                        primaryKey: schema.primaryKey
                    };
                });
                return extjs;
            },

            /**
             * <p>Add a schema</p>
             *
             * <p>If the database table for the schema does not exist, it is
             * created.</p>
             *
             * <p>TODO handle diff between existing dataabase table and schema
             * passed in.</p>
             *
             * @param {object} schema schema definition
             * @returns {void} nothing
             */
            add: function(schema) {
                var name = schema.name;
                schemas[name] = schema;

                if (schema.primaryKey) {
                    schema.fields.each(function(field) {
                        if (field.name === schema.primaryKey) {
                            schema.primaryKeyField = field;
                            return false;
                        }
                    });
                }
				if (SQL.getScalar('SELECT COUNT(*) FROM user_objects WHERE object_name=' + SQL.quote(name))) {
					// exists
					Schema.change(name);
				}
				else {
					Schema.create(name);
				}
            },

            /**
             * <p>Define an abstract schema</p>
             *
             * <p>Abstract schemas are meant to be extended to create a schema
             * that is represented in the database.</p>
             *
             * @see Schema#extend
             *
             * @param {object} schema abstract schema definition
             */
            define: function(schema) {
                var name = schema.name;
                schemas[name] = schema;
            },

            /**
             * <p>Extend (inherit from) an existing schema</p>
             *
             * <p>Typically an abstract schema is extended.</p>
             *
             * @param {object} name name of base schema (or schema) to extend
             * @param {object} child fields to extend base schema with
             * @returns {void} nothing
             */
            extend: function(name, child) {
                var schema = getSchema(name);
                // TODO don't concat reserved fields
                child.fields = schema.fields.concat(child.fields);
                child.primaryKey = child.primaryKey || schema.primaryKey;
                if (child.indexes && schema.indexes) {
                    child.indexes = schema.indexes.concat(child.indexes);
                }
                Schema.add(child);
            },

            /**
             * Determine if database table for a schema exists
             *
             * @param {string} name name of database table (and schema)
             * @returns {boolean} true if table exists, false otherwise
             */
            exists: function(name) {
                try {
                    SQL.getDataRow('SHOW CREATE TABLE ' + name);
                    return true;
                }
                catch (e) {
                    return false;
                }
            },

            /**
             * Get a schema by name
             *
             * @param name name of schema
             */
            getSchema: function(name) {
                return getSchema(name);
            },

            /**
             * Get an empty/new record for a schema
             * Merges in an example, if provided.
             *
             * @param {object} name name of schema or schema proper
             * @param {object} example optional example to merge
             * @returns {object} record with default values
             */
            newRecord: function(name, example) {
                var schema = getSchema(name);
                var record = {};
                schema.fields.each(function(field) {
                    if (!field.reserved) {
                        record[field.name] = defaultValue(field);
                    }
                });
                return Util.apply(record, example || {});
            },

            /**
             * Clean a record.
             * Removes fields marked clean: true in the schema from the record.
             *
             * @param {object} record record to clean
             * @returns {object} record with fields removed
             */
            clean: function(name, record) {
                var schema = getSchema(name);
                schema.fields.each(function(field) {
                    if (field.serverOnly) {
                        delete record[field.name];
                    }
                });
                return record;
            },

            /**
             * <p>Generate a WHERE clause for SQL query based upon an example.
             * An array of "table.key=value" strings is returned, which can be concatonated
             * with another result of this function to generate WHERE clauses for JOIN
             * type queries.  The values are SQL quoted proper.  If a value contains a %,
             * then LIKE is generated.</p>
             *
             * @param {object} name name of schema or schema proper
             * @param {object} example example to generate WHERE clause for
             * @return {object} array of "table.key=value"
             */
            where: function(name, example) {
                var schema = getSchema(name);
                name = schema.name;
                var where = [];
                schema.fields.each(function(field) {
                    if (!field.noQuery && !field.reserved && example[field.name] !== undefined) {
                        var value = example[field.name];
                        if (Util.isString(value) && value.indexOf('%') !== -1) {
                            where.push(['   "',name,'"."',field.name,'" LIKE ',SQL.quote(value)].join(''));
                        }
                        else if (Util.isArray(value)) {
                            where.push(['   "',name,'"."',field.name,'" IN (',SQL.quote(value),')'].join(''));
                        }
                        else {
                            where.push(['   "',name,'"."',field.name,'"=',SQL.quote(value)].join(''));
                        }
                    }
                });
                return where;
            },

            /**
             * Return count of records in schema based on example
             *
             * @param {object} name name of schema or schema
             * @param {object} example example to count
             * @returns {int} count of records matching example
             */
            count: function(name, example) {
                var schema = getSchema(name);
                name = schema.name;
                example = example || {};
                var where = Schema.where(name, example);
                var query = [
                    'SELECT',
                    '       COUNT(*)',
                    'FROM',
                    '       ' + name
                ];
                if (where.length) {
                    query.push('WHERE');
                    query.push(where.join(' AND '));
                }
                return SQL.getScalar(query);
            },

            onLoad: function(name, example) {
                var schema = getSchema(name);
                if (!Util.isArray(example)) {
                    if (schema.onLoad) {
                        schema.onLoad(example);
                    }
                }
                else {
                    example.each(function(ex) {
                        if (schema.onLoad) {
                            schema.onLoad(ex);
                        }
                    });
                }
                return example;
            },

            onPut: function(name, example) {
                var schema = getSchema(name);
                if (!Util.isArray(example)) {
                    if (schema.onPut) {
                        schema.onPut(example);
                    }
                }
                else {
                    example.each(function(ex) {
                        if (schema.onPut) {
                            schema.onPut(ex);
                        }
                    });
                }
                return example;
            },

            /**
             *  Query a schema for multiple records by example
             *
             *  @param {object} name name of a schema or a schema proper
             *  @param {object} example example to query
             *  @returns {object} all matching rows from the database
             */
            find: function(name, example) {
                return find(name, example, false);
            },

            /**
             *  Query a schema for a single record by example
             *
             *  @param {object} name name of a schema or a schema proper
             *  @param {object} example example to query
             *  @returns {object} a single row from the database
             */
            findOne: function(name, example) {
                return find(name, example, true);
            },

            /**
             * <p>Get a list for ExtJS grid</p>
             *
             * @param {object} name name of schema or schema struct
             * @param {object} example
             * @param {function} fn optional function called to add information to each record
             * @returns {object} object suitable for sending as JSON for ExtJS DataStores.
             *
             * <p>Note: if fn is provided, it will be called for each record in the returned list with
             * the record as the only argument.</p>
             */
            list: function(name, example, fn) {
                example = example || {};
                var schema = getSchema(name);
                name = schema.name;

                var startRow = req.data.start || 0;
                var maxRows = req.data.limit || 25;
                var sort = req.data.sort || schema.primaryKey;
                var dir = req.data.dir || 'ASC';

                var where = Schema.where(name, example);
                var query = [
                    'SELECT',
                    '       COUNT(*)',
                    'FROM',
                    '       "' + name + '"'
                ];
                if (where.length) {
                    query.push('WHERE');
                    query.push(where.join(' AND '));
                }
                var count = SQL.getScalar(query);
                query[1] = '    *';
                query = query.concat([
                    'ORDER BY',
                    '   "' + sort + '" ' + dir,
                    'LIMIT',
                    '   ' + startRow + ',' + maxRows
                ]);
                var items = SQL.getDataRows(query);
                if (fn && items) {
                    items.each(fn);
                }
                return {
                    count: count,
                    list: items
                };
            },

            /**
             * <p>Store a record in the database</p>
             *
             * <p>This function will insert a new record or update an existing record.</p?
             *
             * <p>If the record is new, the example is merged with default values so a complete
             * record is created.  The primary key in the returned record is set to the insert_id
             * generated by the query.</p>
             *
             * <p>If the record exists, the example is merged with the existing record and updated
             * in the database.</p>
             *
             * @param {object} schema name of schema or schema proper
             * @param {object} example full or partial record to store in the database
             * @returns {object} complete record as stored in the database.
             */
            putOne: function(schema, example) {
                function update(schema, example) {
                    var where = ' where "' + schema.primaryKey + '"=' + SQL.quote(example[schema.primaryKey]),
                        updates = [],
                        clobs = [];
                    schema.fields.each(function(field) {
                        if (!field.reserved) {
                            if (field.type.toUpperCase() === 'CLOB') {
                                clobs.push(field.name);
                                updates.push('"' + field.name + '"=' +"''");
                            }
                            else {
                                updates.push('"' + field.name + '"=' + SQL.quote(example[field.name]));
                            }
                        }
                    });
                    SQL.update('update "' + schema.name + '" set ' + updates.join(',') + where);
                    clobs.each(function(clob) {
                        var data = example[clob];
                        clob = '"' + clob + '"';
                        clob = clob + '=' + clob + '||';
                        var len = data.length;
                        var offset = 0;
                        while (len > 0) {
                            var size = Math.min(len, 3000);
                            SQL.update('update "' + schema.name + '" set ' + clob + SQL.quote(data.substr(offset, size)) + where);
                            offset += size;
                            len -= size;
                        }
                    });
                }
                function insert(schema, example) {
                    var name = schema.name,
                        insert_id = SQL.getScalar('SELECT "' + name + '_' + schema.primaryKey + '_SEQ".nextval from dual'),
                        where = ' where "' + schema.primaryKey + '"=' + SQL.quote(insert_id),
                        keys = [],
                        values = [],
                        clobs = [];

                    schema.fields.each(function(field) {
                        if (!field.reserved) {
                            keys.push('"' + field.name + '"');
                            if (field.name === primaryKey && field.autoIncrement && !example[field.name]) {
                                values.push(SQL.quote(insert_id));
                            }
                            else if (field.type.toUpperCase() === 'CLOB') {
                                clobs.push(field.name);
                                values.push("''");
                            }
                            else {
                                values.push(SQL.quote(example[field.name]));
                            }
                        }
                    });

                    SQL.update('INSERT INTO "' + name + '" (' + keys.join(',') + ') VALUES (' + values.join(',') + ')');
                    if (primaryKey && !example[primaryKey]) {
                        example[primaryKey] = insert_id;
                    }
                    clobs.each(function(clob) {
                        var data = example[clob];
                        clob = '"' + clob + '"';
                        clob = clob + '=' + clob + '||';
                        var len = data.length;
                        var offset = 0;
                        while (len > 0) {
                            var size = Math.min(len, 3000);
                            SQL.update('update "' + schema.name + '" set ' + clob + SQL.quote(data.substr(offset, size)) + where);
                            offset += size;
                            len -= size;
                        }
                    });

                }

                schema = getSchema(schema);
                // console.dir(schema);
                var name = schema.name;
                var primaryKey = (schema.primaryKey && schema.primaryKey.indexOf(',') === -1) ? schema.primaryKey : undefined;

                example = Schema.newRecord(schema, example);
                example = Schema.onPut(schema, example);

                var primaryKeyField = schema.primaryKeyField;
                if (primaryKeyField) {
                    if (primaryKeyField.autoIncrement) {
                        if (example[primaryKeyField.name]) {
                            update(schema, example);
                        }
                        else {
                            insert(schema, example);
                        }
                    }
                }

    //             var keys = [], values = [];
				// var insert_id = 0;
    //             schema.fields.each(function(field) {
    //                 if (!field.reserved) {
    //                     keys.push('"' + field.name + '"');
				// 		if (field.name === primaryKey && field.autoIncrement && !example[field.name]) {
				// 			insert_id = SQL.getScalar('SELECT "'+name+'_'+field.name+'_SEQ".nextval from dual');
				// 			values.push(SQL.quote(insert_id));
				// 		}
    //                     else if (field.type.toUpperCase() === 'CLOB') {
    //                         values.push('TO_CLOB(' + SQL.quote(example[field.name]) + ')');
    //                     }
				// 		else {
    //                         values.push(SQL.quote(example[field.name]));
				// 		}
    //                 }
    //             });

    //             SQL.update('INSERT INTO "' + name + '" (' + keys.join(',') + ') VALUES (' + values.join(',') + ')');
    //             if (primaryKey && !example[primaryKey]) {
    //                 example[primaryKey] = insert_id;
    //             }
                return Schema.onLoad(schema, example);
            },

            /**
             * <p>Remove one or more records from the database.</p>
             *
             * @param {string} name name of schema or schema proper.
             * @param {object} example example of record(s) to remove from database.
             * @returns {int} number of rows removed
             */
            remove: function(name, example) {
                var where = Schema.where(name, example);
                if (!where.length) {
                    throw new Error('Invalid example provided to remove function');
                }
                example = Schema.onPut(example);
                var query = [
                    'DELETE',
                    'FROM',
                    '       ' + name
                ];
                query.push('WHERE');
                query.push(where.join(' AND '));
                return SQL.update(query);
            },

            /**
             * Create a database table from a schema
             *
             * @param {string} name name of schema or schema proper
             * @param {boolean} drop (optional) true to first drop table
             * @returns {void} nothing
             */
            create: function(name, drop) {
                var schema = getSchema(name);
                if (drop) {
                    SQL.update('DROP TABLE IF EXISTS "' + schema.name + '"');
                }
                var query = [
                    'CREATE TABLE "' + name + '" ('
                ];
                var primaryKey = null;
                schema.fields.each(function(field) {
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
                });
				var len = query.length - 1;
				query[len] = query[len].replace(/,$/, '');
				query.push(')');
                SQL.update(query);
				// primary key
                if (schema.primaryKey) {
					SQL.update('ALTER TABLE "'+name +'" ADD ( CONSTRAINT "'+schema.primaryKey+'_PK" PRIMARY KEY ("'+schema.primaryKey+'"))');
                }
                else if (primaryKey) {
					SQL.update('ALTER TABLE "'+name +'" ADD ( CONSTRAINT "'+primaryKey+'_PK" PRIMARY KEY ("'+primaryKey+'"))');
                    query.push('    Primary Key("' + primaryKey + '")');
                }
                if (schema.indexes) {
					schema.indexes.each(function(index) {
						SQL.update('CREATE INDEX "' +  name + '_' + index + '_idx" ON "' + name +'" ("' + index + '")');
					});
				}
                if (schema.onCreate) {
                    onStartFuncs.push(schema.onCreate);
                    //schema.onCreate();
                }
            },

            /**
             * <p>Generate a Schema definition from an existing database table.</p>
             *
             * <p>TODO this function could fill in initialRecords with all the records
             * in the existing table.</p>
             *
             * @param {string} name of database table
             * @returns {object} Schema definition
             */
            getFromTable: function(name) {
                var schema = {
                    name: name
                };
                var fields = [];
                var rows = SQL.getDataRows('SELECT column_name, data_type, data_length, data_precision, data_scale FROM all_tab_columns WHERE table_name='+SQL.quote(name));
				rows.each(function(row) {
					switch(row.DATA_TYPE) {
						case 'NUMBER':
							if (SQL.getScalar('SELECT COUNT(*) FROM user_sequences WHERE sequence_name=' + SQL.quote(name + '_' + row.COLUMN_NAME + '_SEQ'))) {
								fields.push({
									name: row.COLUMN_NAME,
									type: 'INT',
									size: 1,
									autoIncrement: true
								});
							}
							else {
								fields.push({
									name: row.COLUMN_NAME,
									type: 'INT',
									size: 1
								});
							}
							break;
						case 'VARCHAR2':
							fields.push({
								name: row.COLUMN_NAME,
								type: 'VARCHAR',
								size: row.DATA_LENGTH
							});
							break;
						case 'CLOB':
							fields.push({
								name: row.COLUMN_NAME,
								type: 'CLOB',
								size: 4000
							});
							break;
                        default:
                            fields.push({
                                name: row.COLUMN_NAME,
                                type: row.DATA_TYPE,
                                size: row.DATA_LENGTH
                            });
                            break;
					}
				});
				schema.fields = fields;
				// get primaryKey
				var primaryKey = SQL.getScalar([
					"SELECT",
					'	column_name',
					'FROM',
					'	ALL_CONS_COLUMNS A',
					'	JOIN ALL_CONSTRAINTS C  ON A.CONSTRAINT_NAME = C.CONSTRAINT_NAME',
					'WHERE',
					'	C.TABLE_NAME = ' + SQL.quote(name) + " AND C.CONSTRAINT_TYPE = 'P'"
				]);
				schema.primaryKey = primaryKey;
				var indexes = [];
				rows = SQL.getDataRows('select index_name, column_name from user_ind_columns WHERE table_name=' + SQL.quote(name));
				if (rows) {
					rows.each(function(row) {
						if (row.COLUMN_NAME !== primaryKey) {
							indexes.push(row.COLUMN_NAME);
						}
					});
				}
				schema.indexes = indexes;
				return schema;
            },

            change: function(name) {
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

        };
    }