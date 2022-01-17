function(item) {
        var message = item.file + ":" + item.line;
        if (item.function)
            message += " in " + item.function;
        console.log("  " + message);
    }