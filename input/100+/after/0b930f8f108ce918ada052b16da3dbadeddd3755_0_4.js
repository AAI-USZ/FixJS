function(name, drop) {
                var schema = getSchema(name);
                if (drop) {
                    SQL.update('DROP TABLE IF EXISTS "' + schema.name + '"');
                }
                var query = [
                    'CREATE TABLE "' + name + '" ('
                ];
                var primaryKey = null;
                schema.fields.each(function(field) {
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
            }