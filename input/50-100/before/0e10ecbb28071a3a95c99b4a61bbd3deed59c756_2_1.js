function(res) {
                        obj = {
                            id: f.id,
                            file: f.name,
                            size: f.size,
                            percent: 0,
                            unique: res.value === true
                        }
                        if (obj.isUnique) {
                            obj.date = new Date();
                        }
                        else {
                            obj.date = new Date(res.value.created);
                        }
                        var item = self.uploaderList.store.add(obj);
                    }