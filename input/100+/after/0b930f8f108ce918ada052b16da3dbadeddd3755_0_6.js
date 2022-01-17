function changeField(srcField, dstField) {
                    if (srcField.type.toLowerCase() === 'clob' && dstField.type.toLowerCase().substr(0,7) === 'varchar') {
                        // changing a varchar to CLOB
                        SQL.update('ALTER TABLE "' + name + '" ADD XYZZY CLOB');
                        SQL.update('UPDATE "' + name + '" SET XYZZY="' + srcField.name + '"');
                        SQL.update('ALTER TABLE "'+ name + '" DROP COLUMN "' + srcField.name + '"');
                        SQL.update('ALTER TABLE "' + name + '" RENAME COLUMN XYZZY TO "' + srcField.name + '"');
                    }
                    else if (srcField.type.toLowerCase().substr(0,7) === 'varchar' && dstField.type.toLowerCase() === 'clob') {
                        SQL.update('ALTER TABLE "' + name + '" ADD XYZZY VARCHAR(' + srcField.size + ')');
                        SQL.update('UPDATE "' + name + '" SET XYZZY="' + srcField.name + '"');
                        SQL.update('ALTER TABLE "'+ name + '" DROP COLUMN "' + srcField.name + '"');
                        SQL.update('ALTER TABLE "' + name + '" RENAME COLUMN XYZZY TO "' + srcField.name + '"');
                    }
                    else {
                        var query = [
                            'ALTER TABLE',
                            '   "'+name+'"',
                            'MODIFY ('
                        ];
                        if (srcField.type.toLowerCase().substr(0,7) === 'varchar') {
                            query.push('    "'+srcField.name+'" ' + srcField.type + '(' + srcField.size + ')');
                        }
                        else {
                            query.push('    "'+srcField.name+'" ' + srcField.type);
                        }
                        query.push(')');
                        SQL.update(query);
                    }
                }