function (k, v) {
        if (this['data'][k] == v) return false;
        this['data'][k] = v;
        //设计变更列表，用于提交到server
        if (!this.changes)
            this.changes = {};
        //只记录最后一次
        this.changes[k] = { 'ID': this.id(), 'Name': k, 'Value': v };
        debuger.info('new changelog ' + k + ' of ' + this.id(), this.changes[k]);
        return true;
    }