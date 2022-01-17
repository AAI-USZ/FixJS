function forkNode(){
  var args, i, that;
  args = argv.slice(1);
  i = 0;
  while (that = args[++i]) {
    if (that == '-n' || that == '--nodejs') {
      args.splice(i--, 2);
    }
  }
  require('child_process').spawn(process.execPath, o.nodejs.join(' ').trim().split(/\s+/).concat(args), {
    cwd: process.cwd(),
    env: process.env,
    customFds: [0, 1, 2]
  });
}