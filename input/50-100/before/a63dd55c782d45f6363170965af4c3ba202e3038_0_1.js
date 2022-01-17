function() {
        var res = this.callback.apply(this.module, this.params);
        if(res) {
            this.module.exports = res;
            if(this.defined) {
                console.warn('Multiple define block with return value in', this.module.filename);
            }
            else {
                this.defined = true;
            }
        }
    }