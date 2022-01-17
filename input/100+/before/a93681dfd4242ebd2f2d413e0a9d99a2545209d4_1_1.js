function(request)
{
    WebInspector.TabbedPane.call(this);
    this.element.addStyleClass("network-item-view");

    var headersView = new WebInspector.RequestHeadersView(request);
    this.appendTab("headers", WebInspector.UIString("Headers"), headersView);

    var responseView = new WebInspector.RequestResponseView(request);
    var previewView = new WebInspector.RequestPreviewView(request, responseView);

    this.appendTab("preview", WebInspector.UIString("Preview"), previewView);
    this.appendTab("response", WebInspector.UIString("Response"), responseView);

    if (request.requestCookies || request.responseCookies) {
        this._cookiesView = new WebInspector.RequestCookiesView(request);
        this.appendTab("cookies", WebInspector.UIString("Cookies"), this._cookiesView);
    }

    if (request.timing) {
        var timingView = new WebInspector.RequestTimingView(request);
        this.appendTab("timing", WebInspector.UIString("Timing"), timingView);
    }

    if (request.frames().length > 0) {
        var frameView = new WebInspector.ResourceWebSocketFrameView(request);
        this.appendTab("webSocketFrames", WebInspector.UIString("WebSocket Frames"), frameView);
    }

    this.addEventListener(WebInspector.TabbedPane.EventTypes.TabSelected, this._tabSelected, this);
}