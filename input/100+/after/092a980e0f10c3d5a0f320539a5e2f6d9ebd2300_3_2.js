function extractPayload(content) {
        var payload = {};

        if (content[0] !== "<") {
            // text
            payload.nodeType = 3;
            payload.nodeValue = content;
        } else if (content.substr(0, 4) === "<!--") {
            // comment
            payload.nodeType = 8;
            payload.nodeValue = content.substr(4, content.length - 7);
        } else if (content[1] === "!") {
            // doctype
            payload.nodeType = 10;
        } else {
            // regular element
            payload.nodeType = 1;
            payload.nodeName = /^<([^>\s]+)/.exec(content)[1].toUpperCase();
            payload.attributes = _extractAttributes(content);

            // closing node (/ at the beginning)
            if (payload.nodeName[0] === "/") {
                payload.nodeName = payload.nodeName.substr(1);
                payload.closing = true;
            }

            // closed node (/ at the end)
            if (content[content.length - 2] === "/") {
                payload.closed = true;
            }
        }
        return payload;
    }