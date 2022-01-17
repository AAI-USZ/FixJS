function (token) {
        // CodeMirror marks all sorts of CSS tokens as "number", including enums like "auto" and segments of URL paths
        return token.className === "number" && !isNaN(parseFloat(token.string));
    }