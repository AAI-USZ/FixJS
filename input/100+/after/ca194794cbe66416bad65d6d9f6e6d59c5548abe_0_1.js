function (err) {
    var t = this.t

    t.equal(err, null, "error is not null")
    t.ok(this.update.calledOnce, "update was not called")
    t.ok(this.update.calledWith({
        key: "foo"
    }, {
        $set: {
            key: "foo"
            , data: this.value
        }
    }, {
        safe: true
        , upsert: true
    }, sinon.match.func), "update not called correctly")

    t.end()
}