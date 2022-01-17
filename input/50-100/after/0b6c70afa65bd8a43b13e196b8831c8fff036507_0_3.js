function ExecutionQueue(schema,next) {
        this.driver     = new Driver(schema, this.ready.bind(this), this.startQueue.bind(this));
        this.started    = false;
        this.stack      = [];
        this.version    = _.last(schema.migrations).version;
        this.next = next;
    }