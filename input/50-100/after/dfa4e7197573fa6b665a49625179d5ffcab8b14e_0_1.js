function(err, data) {
          var data = data.toString().split(/\n\n/),
              props = yaml.load(data[0]);
          data.shift();
          var body = md(data.join('\n\n')),
              post = {'title': props.title, 'timestamp': props.timestamp, 'body': body};
          cb(err, post);
        }