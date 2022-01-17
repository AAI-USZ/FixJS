function(t) {
                $(t).destroy();
                if (t.id > 0) {
                    this.data[bucket].erase(t.id)
                }
                else {
                    this.data[bucket].erase(t.name)
                }
                this.change();
            }