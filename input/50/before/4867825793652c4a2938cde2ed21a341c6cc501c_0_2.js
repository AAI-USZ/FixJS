function (response) {
    this.loginfo("Successfully delivered mail: " + this.filename + ' (' + response + ')');
    delivery_concurrency--;
    plugins.run_hooks("delivered", this, response);
}