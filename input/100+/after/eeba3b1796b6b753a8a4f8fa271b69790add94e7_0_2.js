function req_proxy() {
            
            if (client._closing)
               throw new Error('client is in closing state');
   
            // simple overflow handling (this means that currently there is no way to have more than 65535 requests in the queue
            // TODO: edge cases testing 
            if (client.seq_num == 65535)
               client.seq_num = 0;
            else
               client.seq_num++;
           
            // disable long stack trace for the moment, it's too expensive
            // performance when enabled (travis-ci worker, Xfvb): 70000 requests finished in 52196 ms, 1341.0989347842747 req/sec
            // without: 70000 requests finished in 14904 ms, 4696.725711218465 req/sec
            // MBPro, XQuartz: with 3600 req/sec, without 24200 req/sec 
            if (this.options.debug === true) {
               var err = new Error();
               err.name = reqName; //???
               Error.captureStackTrace(err, arguments.callee);
               err.timestamp = Date.now();
               client.seq2stack[client.seq_num] = err;
            }

            // is it fast?
            var args = Array.prototype.slice.call(req_proxy.arguments);

            var callback = args.length > 0 ? args[args.length - 1] : null;
            if (callback && callback.constructor.name != 'Function')
                callback = null;

            // TODO: see how much we can calculate in advance (not in each request)
            var reqReplTemplate = reqs[reqName];
            var reqTemplate  = reqReplTemplate[0];
            var templateType = typeof reqTemplate;

            if (templateType == 'object')
                templateType = reqTemplate.constructor.name;

            if (templateType == 'function')
            {
                 // call template with input arguments (not including callback which is last argument TODO currently with callback. won't hurt)
                 //reqPack = reqTemplate.call(args);
                 var reqPack = reqTemplate.apply(this, req_proxy.arguments); 
                 var format = reqPack[0];
                 var requestArguments = reqPack[1];

                 if (callback)
                     this.replies[this.seq_num] = [reqReplTemplate[1], callback];
                 
                 client.pack_stream.pack(format, requestArguments);
                 var b = client.pack_stream.write_queue[0];
                 client.pack_stream.flush();
                 
            } else if (templateType == 'Array'){
                 var format = reqTemplate[0];
                 var requestArguments = [];

                 for (var a = 0; a < reqTemplate[1].length; ++a)
                     requestArguments.push(reqTemplate[1][a]);                 
                 for (var a in args)
                     requestArguments.push(args[a]);

                 if (callback)
                     this.replies[this.seq_num] = [reqReplTemplate[1], callback];

                 client.pack_stream.pack(format, requestArguments);
                 client.pack_stream.flush();
            } else {
                 throw 'unknown request format - ' + templateType;
            }
        }