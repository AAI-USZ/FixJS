function View(game) {
    this.canvas = new Raphael('canvas', constants.WIDTH, constants.HEIGHT);
    this.repository = new Repository();
    this.taskQueue = new TaskQueue();
    this.splashVisible = false;
}