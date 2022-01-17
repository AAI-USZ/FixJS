function DataAggregatedInternal(tabData)
            {
                Random.Extension.LogInfo("Writing tabs for [" + timestampString + "].");

                var transaction = db.transaction([RANDOM_EXT_TABLE_TABS], IDBTransaction.READ_WRITE)
                var store = transaction.objectStore(RANDOM_EXT_TABLE_TABS);

                function InsertNewInternal()
                {
                    try
                    {
                        var data = {
                                FormalTimestamp:    Random.Extension.GetTimestampString({ OnlyDate: false, Nice: true }),
                                TabData:            tabData
                            }

                        data[RANDOM_EXT_PK_TABS] = timestampString;

                        var request = store.put(data);
                    }
                    
                    catch(e)
                    {
                        Random.Extension.ThrowError("Exception for write of new entry.", e);
                        return;
                    }
                    
                    request.onerror = function(ev) {
                            Random.Extension.ThrowError("Could not write new entry: " + ev.target.errorCode);
                        }

                    request.onsuccess = function(ev) {
                            success(false);
                        }
                }
                
                var ptr = 0;
                
                function ClipOldRecords()
                {
                    if(count < Random.Extension.Data.MaxRecords)
                    {
                        InsertNewInternal();
                        return;
                    }
                
                    var key = list[ptr];
                    ptr++;
                    count--;
                    
                    Random.Extension.LogInfo("Delete old tabs record with ID [" + key + "].");
                    
                    var request = store.delete(key);
                    
                    request.onerror = function(ev) {
                            Random.Extension.ThrowError("Could not delete old tabs record with key [" + key + "] in position (" + ptr + "): " + ev.target.errorCode);
                        }

                    request.onsuccess = function(ev) {
                            ClipOldRecords();
                        }
                }
                
                ClipOldRecords();
            }