function () {

								window.schemaDef.set({
									"short_code": resp["short_code"],
									"ddl": resp["ddl"],
									"ready": true,
									"valid": true,
									"errorMessage": "",
									"statement_separator": resp["schema_statement_separator"],
									"dbType": window.dbTypes.getSelectedType()
								});
								renderTerminator($(".panel.schema"), resp["schema_statement_separator"]);
																
								if (resp["sql"])
								{
									window.myFiddleHistory.insert(new UsedFiddle({
										"fragment": "!" + db_type_id + "/" + resp["short_code"] + "/" + resp["id"]
									}));
		
									window.query.set({
										"id": resp["id"],
										"sql":  resp["sql"],
										"statement_separator": resp["query_statement_separator"]
									});
								}
								else
								{
									window.myFiddleHistory.insert(new UsedFiddle({
										"fragment": "!" + db_type_id + "/" + resp["short_code"]
									}));									
								}				
								
								window.browserEngines[selectedDBType.get("className")].getSchemaStructure({
										callback: function (schemaStruct) {
											window.schemaDef.set({
												"schema_structure": schemaStruct
											});

											window.schemaDef.trigger("reloaded");
											
											if (resp["sql"])
											{
												window.browserEngines[selectedDBType.get("className")].executeQuery({
													sql: resp["sql"],
													statement_separator: resp["query_statement_separator"],
													success: function (sets) {

														window.query.set({
															"sets": sets
														});				
			
														window.query.trigger("reloaded");
				
														$("body").unblock();
													},
													error: function (e) {

														window.query.set({
															"sets": []
														});				
														
														window.query.trigger("reloaded");
				
														$("body").unblock();
													}
												});
											}
											else
											{
												$("body").unblock();	
											} // end if resp["sql"]

										}
									});
								

							}