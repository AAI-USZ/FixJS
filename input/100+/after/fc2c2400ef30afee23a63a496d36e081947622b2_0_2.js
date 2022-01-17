function (code) {
    if (this.opened) {
        var callbacks = {"output": $.proxy(this.handle_output, this)};
        this.set_last_request(null, this.kernel.execute(code, callbacks, {"silent": false}));
    } else {
        this.deferred_code.push(code);
    }
    if (!this.executed) {
        this.executed = true;
        var that = this;
        sagecell.sendRequest("POST", sagecell.URLs.permalink,
            {"message": JSON.stringify({"header": {"msg_type": "execute_request"},
                                        "content": {"code": code}})},
            function (data) {
                var link = that.outputDiv.find("a.sagecell_permalink");
                link.attr("href", sagecell.URLs.root + "?q=" + JSON.parse(data).permalink);
                link.css("display", "inline");
            });
    }
}