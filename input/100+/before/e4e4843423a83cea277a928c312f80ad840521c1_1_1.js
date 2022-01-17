function HttpError(options) {
        assert.object(options, 'options');

        options.constructorOpt = options.constructorOpt || HttpError;
        VError.apply(this, arguments);

        var self = this;
        var code = parseInt((options.statusCode || 500), 10);
        this.statusCode = code;
        this.body = options.body || {
                code: codeToErrorName(code),
                message: options.message || self.message
        };
        this.message = options.message || self.message;
}