function (data, enc) {
            orig_end.call(res, data, enc);
            if (++(worker.requests) >= max_requests) {
                log.info("Worker PID " + worker.pid + " reached max requests");
                worker.kill();
            }
        }