function(err, stderr, stdout) {
            if (err) 
                console.error('An error occurred while emulating/deploying the ' + platform + ' project.', err);
            console.log(stdout);
        }