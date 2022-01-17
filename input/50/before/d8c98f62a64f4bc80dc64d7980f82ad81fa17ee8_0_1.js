function () {
    this.next(); //to next test
    this.emit("abort");
    this.emit("agentError", {
        message: "Agent timed out running test: " + this.currentUrl
    });
}