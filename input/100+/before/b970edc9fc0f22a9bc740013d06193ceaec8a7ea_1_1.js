function (args) {
    console.log('Watching project');
    var prms = require(p.join(process.cwd(), 'params'));
    ae86.watch(function listener() {
      console.log('Change detected. Regenerating website');
      ae86.gen(prms.params, function (err, result) {
      });
    });
  }