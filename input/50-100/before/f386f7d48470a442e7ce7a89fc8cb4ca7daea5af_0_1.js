function(error) {
    console.log(error + "\n");

    if (error.stack) {
        error.stack.forEach(function(item) {
            var message = item.sourceURL + ":" + item.line;
            if (item.function)
              message += " in " + item.function;
            console.log("  " + message);
        });
    }
}