function () {
                if (indexOf(this.id, ids) < 0) {
                    ids.push(this.id);
                    filtered.push(this);
                }
            }