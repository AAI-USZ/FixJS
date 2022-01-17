function (json) {
    if (typeof json === 'object') {
        json = JSON.stringify(json);
    }
    this.response.writeHead(200, {"Content-Type": "application/json"});
    this.response.write(JSON.stringify(json));
    this.response.end();
}