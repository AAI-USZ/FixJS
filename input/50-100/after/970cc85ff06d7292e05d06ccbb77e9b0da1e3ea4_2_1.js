function(data) {

                var change = false;
                for (var key in addresses) {
                    var addr = addresses[key];
                    if (addr.tag == 1) {
                        addr.tag = null; //Make any unsaved addresses as saved
                        change = true;
                    }

                    //Update view remove 'Unsynced' tags
                    if (change)
                        buildVisibleView();
                }

                //Update to the new payload new_checksum
                payload_checksum = new_checksum;

                makeNotice('success', 'misc-success', data);

                if (successcallback != null)
                    successcallback();

                updateCacheManifest();
            }