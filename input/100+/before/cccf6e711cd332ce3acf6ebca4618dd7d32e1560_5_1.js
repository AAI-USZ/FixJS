function(getTxtOutput) {
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
            element: txtConsole.$ext,
            id: "console"
        };
    }

    if (!getTxtOutput.$ext)
        getTxtOutput.$ext = txtConsole.$ext;

    return {
        element: getTxtOutput.$ext,
        id: getTxtOutput.id
    };
}