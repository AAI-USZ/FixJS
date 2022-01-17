function(code, context, file, cb) {
            log.info("Master REPL (cmd): > " + util.inspect(code));
            var err, result;
            try {
                result = vm.runInContext(code, context, file);
            } catch (e) {
                err = e;
            }
            log.info("Master REPL (result): " + util.inspect([err, result]));
            cb(err, result);
        }