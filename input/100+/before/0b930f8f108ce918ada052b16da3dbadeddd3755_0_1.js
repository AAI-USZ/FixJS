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