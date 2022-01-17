function () {
    this.emit("abort");
    this.emit("agentError", {
        message: "Agent timed out running test: " + this.currentUrl
    });
    this.next(); //to next test
}