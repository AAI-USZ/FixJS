function (src) {
            var lines = src.split('\n');

            // if (callFrames[0].functionName == 'Function.promise') {
            //     // new promise

            //     var realLoc = callFrames[2].location;
            //     var realSrc = lines[realLoc.lineNumber].slice(realLoc.columnNumber)
            //     var length = 0;

            //     var regexp = /^later(?:\s*\(\s*\)\s*;?)?/;
            //     var match = regexp.exec(realSrc);
            //     if (match) {
            //         var length = match[0].length;
            //     } else {
            //         log('warning: did not match', realSrc)
            //     }

            //     Inspector.Debugger.evaluateOnCallFrame(callFrames[0].callFrameId, 'this.promiseId', 'promises', false, true, function (ev) {
            //         var promise = { loc: realLoc, length: length, promiseId: ev.result.value };
            //         promises.push(promise);
            //         // log('got a promise', promise);
            //         log('got a later');

            //         Inspector.Debugger.resume();
            //     });
            // } else {
            //     Inspector.Debugger.evaluateOnCallFrame(callFrames[0].callFrameId, 'this.promiseId', 'promises', false, true, function (ev) {
            //         var promise = getPromise(ev.result.value);
            //         if (promise) {
            //             // log('promise!', promise);
            //             Inspector.Debugger.evaluateOnCallFrame(callFrames[0].callFrameId, 'this.arguments.length', 'promises', false, true, function (ev) {
            //                 var makeArgsStr = function (count) {
            //                     return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].slice(0, count).join(', ');
            //                 };
            //                 var prefix = 'function (' + makeArgsStr(ev.result.value) + ') {\n  ';
            //                 var suffix = '\n}';
            //                 showEditor(src, promise.loc, promise.length, prefix, suffix, callFrames);
            //             });
            //         } else {
            //             log('not promise', ev.result);
            //         }
            //     });
            // }

            // return;

            var stopSrc = lines[loc.lineNumber].slice(loc.columnNumber);
            log('stopped at', stopSrc);

            Inspector.Debugger.evaluateOnCallFrame(callFrames[0].callFrameId, 'JSON.stringify(arguments.callee._prebugInfo)', 'blahblahgcgroup', false, true);
        }