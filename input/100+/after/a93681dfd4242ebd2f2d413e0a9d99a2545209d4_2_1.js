function(resource)
{
    WebInspector.View.call(this);
    this.element.addStyleClass("resource-websocket");
    this.resource = resource;
    this.element.removeChildren();

    var dataGrid = new WebInspector.DataGrid({
        data: {title: WebInspector.UIString("Data"), sortable: false},
        length: {title: WebInspector.UIString("Length"), sortable: false, aligned: "right", width: "50px"},
        time: {title: WebInspector.UIString("Time"), width: "70px"}
    });

    var frames = this.resource.frames();
    for (var i = 0; i < frames.length; i++) {
        var payload = frames[i];

        var date = new Date(payload.time * 1000);
        var row = {
            data: "",
            length: payload.payloadData.length.toString(),
            time: date.toLocaleTimeString()
        };

        var rowClass = "";
        if (payload.errorMessage) {
            rowClass = "error";
            row.data = payload.errorMessage;
        } else if (payload.opcode == WebInspector.ResourceWebSocketFrameView.OpCodes.TextFrame) {
            if (payload.sent)
                rowClass = "outcoming";

            row.data = payload.payloadData;
        } else {
            rowClass = "opcode";
            var opcodeMeaning = "";
            switch (payload.opcode) {
            case WebInspector.ResourceWebSocketFrameView.OpCodes.ContinuationFrame:
                opcodeMeaning = WebInspector.UIString("Continuation Frame");
                break;
            case WebInspector.ResourceWebSocketFrameView.OpCodes.BinaryFrame:
                opcodeMeaning = WebInspector.UIString("Binary Frame");
                break;
            case WebInspector.ResourceWebSocketFrameView.OpCodes.ConnectionCloseFrame:
                opcodeMeaning = WebInspector.UIString("Connection Close Frame");
                break;
            case WebInspector.ResourceWebSocketFrameView.OpCodes.PingFrame:
                opcodeMeaning = WebInspector.UIString("Ping Frame");
                break;
            case WebInspector.ResourceWebSocketFrameView.OpCodes.PongFrame:
                opcodeMeaning = WebInspector.UIString("Pong Frame");
                break;
            }
            row.data = WebInspector.UIString("%s (Opcode %d%s)", opcodeMeaning, payload.opcode, (payload.mask ? ", mask" : ""));
        }

        var node = new WebInspector.DataGridNode(row, false);
        dataGrid.rootNode().appendChild(node);

        if (rowClass)
            node.element.classList.add("resource-websocket-row-" + rowClass);

    }
    dataGrid.show(this.element);
}