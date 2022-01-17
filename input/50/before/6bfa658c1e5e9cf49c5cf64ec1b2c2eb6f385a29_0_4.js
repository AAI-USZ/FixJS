function (content, done) {
        this.content = ko.observable(content);
        this.done = ko.observable(done);
        this.editing = ko.observable(false);
    }