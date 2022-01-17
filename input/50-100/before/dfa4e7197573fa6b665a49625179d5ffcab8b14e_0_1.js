function(err, data) {
          var data = data.toString().split(/\n\n/),
              props = yaml.load(data[0]),
              body = md(data[1]),
              post = {'title': props.title, 'time': props.time, 'body': body};
          cb(err, post);
        }