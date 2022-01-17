function (data, operation) {
            if (!data) {
                return;
            }
            if (!data.messages) {
                var resolve = that.globalBundle.resolve;
                data.messages = fluid.makeArray(resolve("recordEditor-" + operation + "FailedMessage", [
                    resolve(that.options.recordType),
                    resolve("recordEditor-unknownError")
                ]));
            }
            var messages = data.messages || fluid.makeArray(data.message);
            fluid.each(messages, function (message) {
                that.messageBar.show(message, Date.today(), data.isError);
            });
        }