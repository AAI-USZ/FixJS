function InsertNewInternal()
                {
                    var transaction = db.transaction([RANDOM_EXT_TABLE_TABS], IDBTransaction.READ_WRITE)
                    var store = transaction.objectStore(RANDOM_EXT_TABLE_TABS);

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