function(row) {
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
				}