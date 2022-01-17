function(data, cb) {
        if (type == 'posts') {
          var data = data.split(/\n\n/),
              props = yaml.load(data[0]);
          data.shift();
          var body = md(data.join('\n\n')),
              options = {posts: [{'title': props.title, 'timestamp': props.timestamp, 'body': body}]};
        } else if (type == 'pages') {
          var options = {body: md(data)};
        };
        jade.renderFile(path + '/templates/' + type + '.jade', options, cb);
      }