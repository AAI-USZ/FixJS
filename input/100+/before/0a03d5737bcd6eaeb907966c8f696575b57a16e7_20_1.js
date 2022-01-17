function (that) {
        return {
            recordType: {
                messagekey: "${recordType}",
                decorators: {"addClass": "{styles}.recordType"}
            },
            title: {
                value: that.buildTitle()
            }
        };
    }