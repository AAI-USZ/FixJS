function ClipOldRecords(totalList, totalCount)
                {
                    var transaction = db.transaction([RANDOM_EXT_TABLE_TABS], IDBTransaction.READ_WRITE)
                    var store = transaction.objectStore(RANDOM_EXT_TABLE_TABS);

                    if(totalCount <= Random.Extension.Data.MaxRecords)
                        return;
                
                    var key;
                    for(var it in totalList)
                    {
                        key = it;
                        break;
                    }
                    
                    ptr++;
                    totalCount--;
                    
                    Random.Extension.LogInfo("Delete old tabs record with ID [" + key + "].");
                    
                    var request = store.delete(key);
                    
                    request.onerror = function(ev) {
                            Random.Extension.ThrowError("Could not delete old tabs record with key [" + key + "] in position (" + ptr + "): " + ev.target.errorCode);
                        }

                    request.onsuccess = function() {
                            ClipOldRecords(totalList, totalCount);
                        }
                }