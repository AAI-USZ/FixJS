function Multi(client, args) {
    this.client = client;
    this.queue = [["MULTI"]];
    if (Array.isArray(args)) {
        this.queue = this.queue.concat(args);
    }
}