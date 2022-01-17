function () {
            spyOn(webview, "executeJavascript");
            event.trigger("foo", {"id": 123});
            expect(webview.executeJavascript).toHaveBeenCalledWith("webworks.event.trigger('foo', '" + JSON.stringify({"id": 123}) + "')");
        }