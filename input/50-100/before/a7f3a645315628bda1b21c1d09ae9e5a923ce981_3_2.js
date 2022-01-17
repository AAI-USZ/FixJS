function(code, context, file, cb) {
            log.info("REPL (cmd): > " + util.inspect(code));
            var err, result;
            try {
                result = vm.runInContext(code, context, file);
            } catch (e) {
                err = e;
            }
            log.info("REPL (result): " + util.inspect([err, result]));
            cb(err, result);
        }