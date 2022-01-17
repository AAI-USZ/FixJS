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