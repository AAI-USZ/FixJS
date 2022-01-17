function(err, data) {
        if(err) {
            fn.handle_error('Could not load configuration file.  This should be named glog_config.json. Err: ' + err);
        }

        var configs = JSON.parse(data);

        // Check mandatory configs
        if(!configs.port) {
            fn.handle_error('port is not defined in glog_config.json.  This should be set to the port number you wish the blog to run on');
            process.exit();
        }

        if(!configs.blog_repository) {
            fn.handle_error('blog_repository is not defined in glog_config.json.  This should point to the git repository of the blog content');
            process.exit();
        }

        if(!configs.author) {
            fn.handle_error('author is not defined in glog_config.json.  This should be the default blog author');
            process.exit();
        }

        for(key in configs) {
            options[key] = configs[key];
        }

    cb(options);
    }