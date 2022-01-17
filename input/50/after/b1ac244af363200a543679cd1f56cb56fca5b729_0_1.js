function (event) {
    self.postMessage("Worker received message: " + event.data);
}