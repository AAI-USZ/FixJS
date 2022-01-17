function(e) {
            if (e.code === 13 && this.value !== "") {
                self._selectCallback(idx, {id: 0, name: this.value}, this);
            }
        }