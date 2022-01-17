function(conf, callback, context){

    var ret = '';
    var err = false;
    var cmd = spawn(phpCmd, [combineCmd].concat(conf), {cwd: __dirname});

    callback = callback || function(err, ret){
      console.log(ret);
      if (err) throw Error(err);
    };

    cmd.stdout.on('data', function cmdSuccess(data){
      ret += data.toString();
    });

    cmd.stderr.on('data', function cmdError(data){
      ret += data.toString();
      err = true;
    });

    cmd.on('exit', function cmdEnd(){
      context = context || this;
      callback.apply(context, [err, ret]);
    });

  }