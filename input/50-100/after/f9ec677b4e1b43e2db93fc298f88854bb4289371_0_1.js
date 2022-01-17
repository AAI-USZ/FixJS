function (error, stdout, stderr) {
                    if (error) {
                        console.log(error.stack);
                        console.log('Error code: '+error.code);
                        console.log('Signal received: '+error.signal);
                        process.exit(1);
                    }
                    console.log("Template expansion successful!");
                }