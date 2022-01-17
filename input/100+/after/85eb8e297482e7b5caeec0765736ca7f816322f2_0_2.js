function displayStack(callFrames) {
        var dom = $('#debugger');
        var displayFrame = function (frame) {
            var result = $.Deferred(), promise = result.promise();

            dom.append($('<h2></h2>').text(frame.functionName + ' (this: ' + frame.this.className + ')'));

            Async.doSequentially(frame.scopeChain, displayScope).done(function () {
                result.resolve();
            });

            return promise;
        };
        var displayScope = function (scope) {
            var result = $.Deferred(), promise = result.promise();

            dom.append($('<h3></h3>').text(scope.type));

            var varsDom = $('<div>&#8230;</div>').appendTo(dom);

            if (scope.type !== 'global') {
                Inspector.Runtime.getProperties(scope.object.objectId, function (ev) {
                    varsDom.empty();
                    for (var i in ev.result) {
                        var v = ev.result[i];
                        varsDom.append(tableFor({
                            name: v.name,
                            value: {
                                type: v.value.type,
                                value: v.value.value,
                                className: v.value.className,
                                description: v.value.description
                            }
                        }));
                    }
                });
            }

            result.resolve();
            return promise;
        };
        dom.empty();
        Async.doSequentially(callFrames, displayFrame);
    }