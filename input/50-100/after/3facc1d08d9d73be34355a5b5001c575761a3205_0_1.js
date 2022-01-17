function watch(vfs) {
  // vfs.watch(".", {}, onWatch);
  vfs.watch("vfs-watch-example.js", {file:true}, onWatch);
  function onWatch(err, meta) {
    if (err) throw err;
    var watcher = meta.watcher;
    watcher.on("change", function (event, filename) {
      console.log("change", event, filename);
    });
    setTimeout(function () {
      console.log("Closing...");
      watcher.close()
    }, 10000);
  }
}