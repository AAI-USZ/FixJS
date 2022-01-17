function(t) {
                    $(t).destroy();
                    if (t.id > 0) {
                        self.data[idx].erase(t.id)
                    }
                    else {
                        self.data[idx].erase(t.name)
                    }
                    self.change();
                }