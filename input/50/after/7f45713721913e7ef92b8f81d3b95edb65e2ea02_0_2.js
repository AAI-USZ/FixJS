function (response) {
    this.lognotice("delivered file=" + this.filename + ' response="' + response + '"');
    delivery_concurrency--;
    plugins.run_hooks("delivered", this, response);
}