function(){
										// ok phonegap and device is ready
										showScreen('screen-add-log');
										
										// ## getAndStoreLog ##
										// get Log, store in a DB and store in myBusLog object
										function storeSuccess(callback){
											console.log("Store is successful ");
											//$('#status-message').html('Sucessfully logged time:' + callback.time );
											$('#status-message').html('Successfully logged: ' + getHtml(callback));
										}
										function getAndStoreLog(){
											var myBusLog,
													myDB;
											myBusLog = getLogData();
											
											
											// store data	
											myDB = window.openDatabase("busDB", "1.0", "Bus DB", 100000);
											storeBusLog(myBusLog, myDB, storeSuccess);										
											
										}
										
										
										// On button click:
										// initate storage
										
										$('#addBtn').click(getAndStoreLog);
										
										
										// read logs and display
										function queryDB(myDB){
											myDB.executeSql('SELECT * FROM test1', [], querySuccess, errorDB);
										}
										function querySuccess(myDB, results){
											var len = results.rows.length;
											for (var i=0; i<len; i++){
												$('#map_canvas').append("Row = " + i + " Firstname = " + results.rows.item(i).id + " Lastname = " + results.rows.item(i).name + "<br>");
											}
										}
										
										
										}