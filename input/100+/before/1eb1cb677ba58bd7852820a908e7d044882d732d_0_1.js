function (data) {
                if (!data) {
                    var resolve = that.options.parentBundle.resolve;
                    that.events.onError.fire({
                        isError: true,
                        message: resolve("recordEditor-fetchFailedMessage", [
                            resolve(that.options.recordType),
                            resolve("recordEditor-unknownError")
                        ])
                    });
                    return;
                }
                if (data.isError) {
                    that.events.onError.fire(data);
                    return;
                }
                that.applier.requestChange("", data);
                that.events.afterFetch.fire();
            }