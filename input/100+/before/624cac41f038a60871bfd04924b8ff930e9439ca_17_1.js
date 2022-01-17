function(index, item) {
                        item = $.parseJSON(item.body);
                        var userid = item['rep:userId'];
                        var displayName = sakai.api.User.getDisplayName(item);
                        data.results[index].ownerId = userid;
                        data.results[index].ownerDisplayName = displayName;
                        data.results[index].ownerDisplayNameShort = sakai.api.Util.applyThreeDots(displayName, 580, {
                            max_rows: 1,
                            whole_word: false
                        }, 's3d-bold', true);
                        data.results[index].ownerDisplayNameShorter = sakai.api.Util.applyThreeDots(displayName, 180, {
                            max_rows: 1,
                            whole_word: false
                        }, 's3d-bold', true);
                    }