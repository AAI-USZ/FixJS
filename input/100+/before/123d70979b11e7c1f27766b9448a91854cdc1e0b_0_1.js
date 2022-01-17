function ClipOldRecords(totalList, totalCount)
                {
                    if(totalCount <= Random.Extension.Data.MaxRecords)
                        return;
                
                    var key = list[ptr];
                    ptr++;
                    totalCount--;
                    
                    Random.Extension.LogInfo("Delete old tabs record with ID [" + key + "].");
                    
                    var request = store.delete(key);
                    
                    request.onerror = function(ev) {
                            Random.Extension.ThrowError("Could not delete old tabs record with key [" + key + "] in position (" + ptr + "): " + ev.target.errorCode);
                        }

                    request.onsuccess = function(ev) {
                            ClipOldRecords();
                        }
                }