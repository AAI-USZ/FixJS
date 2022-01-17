function(data, cb) {
        if (type == 'posts') {
          var data = data.split(/\n\n/),
              props = yaml.load(data[0]),
              body = md(data[1]),
              options = {posts: [{'title': props.title, 'time': props.time, 'body': body}]};
        } else if (type == 'pages') {
          var options = {body: md(data)};
        };
        jade.renderFile(path + '/templates/' + type + '.jade', options, cb);
      }