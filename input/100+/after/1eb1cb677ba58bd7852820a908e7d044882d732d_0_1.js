function (data) {
                if (data.isError) {
                    that.events.onError.fire(data, "fetch");
                    return;
                }
                that.applier.requestChange("", data);
                that.events.afterFetch.fire();
            }