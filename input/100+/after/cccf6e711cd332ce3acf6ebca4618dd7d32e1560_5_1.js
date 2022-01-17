function(getTxtOutput) {

    // this is a hack for commands that are not associated with anything
    // if this happens we usually write it to `txtConsole`
    // but if we don't have that one, we just pump it to /dev/null
    // in this case the preInitConsoleBuffer
    var defaultHandler = typeof txtConsole !== "undefined" && txtConsole && txtConsole.$ext
                            ? txtConsole.$ext
                            : preInitOutputBuffer;
    
    if (typeof getTxtOutput === "object" && getTxtOutput && getTxtOutput.$ext && getTxtOutput.id) {
        return {
            element: getTxtOutput.$ext,
            id: getTxtOutput.id
        };
    }

    if (typeof txtOutput === "undefined") {
        if (getTxtOutput) {
            return {
                element: preInitOutputBuffer,
                id: "output"
            };
        }

        return {
            element: preInitConsoleBuffer,
            id: "console"
        };
    }

    if (typeof getTxtOutput === "boolean" && getTxtOutput) {
        return {
            element: txtOutput.$ext,
            id: "output"
        };
    }
    else if (getTxtOutput === "undefined" || !getTxtOutput) {
        return {
            element: defaultHandler,
            id: "console"
        };
    }


    if (!getTxtOutput.$ext) {
        getTxtOutput.$ext = defaultHandler;
    }

    return {
        element: getTxtOutput.$ext,
        id: getTxtOutput.id
    };
}