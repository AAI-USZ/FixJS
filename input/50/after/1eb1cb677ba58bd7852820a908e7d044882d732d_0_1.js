function (data) {
                            if (data.isError) {
                                that.events.onError.fire(data, "delete");
                                return;
                            }
                            that.events.afterRemove.fire();
                        }