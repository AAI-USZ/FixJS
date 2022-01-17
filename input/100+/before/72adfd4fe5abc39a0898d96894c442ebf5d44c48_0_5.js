function(dirEntry, recursive)
    {
        var list = new Array();
        try {
            while (dirEntry.hasMoreElements()) {
                list.push(dirEntry.getNext().QueryInterface(FileIO.localfileIID));
            }
            if (recursive) {
                var list2 = new Array();
                for ( var i = 0; i < list.length; ++i) {
                    if (list[i].isDirectory()) {
                        files = list[i].directoryEntries;
                        list2 = this._read(files, recursive);
                    }
                }
                for (i = 0; i < list2.length; ++i) {
                    list.push(list2[i]);
                }
            }
        }
        catch (e) {
        }
        return list;
    }