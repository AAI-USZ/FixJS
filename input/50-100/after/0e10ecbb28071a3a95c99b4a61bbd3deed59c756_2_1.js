function(res) {
                        obj = {
                            id: f.id,
                            file: f.name,
                            size: f.size,
                            percent: 0,
                            unique: res.value === true
                        }
                        if (obj.unique) {
                            obj.date = Date.now();
                        }
                        else {
                            obj.date = new Date(res.value.created);
                        }
                        var item = self.uploaderList.store.add(obj);
                    }