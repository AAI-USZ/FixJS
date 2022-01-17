function(pattern, replacement, data, callback) {
    var block = this,
        match,
        result;

    pattern.lastIndex = 0;
    match = pattern.exec(data);
    pattern.lastIndex = 0;

    if(DEBUG) {
        console.log("DATA:", data);
        console.log("PATT:", pattern);
        console.log("MATCH:", match);
    }

    if(replacement) {
        if(match) {
            replacement = replacement.replace(/\$0/g, match[0]);

            if(DEBUG) {
                console.log("REPL:", replacement);
            }

            result = match[0].replace(pattern, replacement);
            pattern.lastIndex = 0;

            if(DEBUG) {
                console.log("RESULT:", result);
            }

            if(block.code.flags.contains("n")) {
                if(!num_expr_re.test(result)) {
                    console.error("Invalid expression:", result);
                    process.exit(1);
                }

                result = eval(result);
            }

            data = data.replace(pattern, result);
        } else {
            result = replacement.replace(/\$0/g, data);

            data = result;
        }
    } else {
        if(match) {
            result = match[0];
        } else {
            result = data;
        }
    }

    if(block.code.flags.contains("w")) {
        result = data;
    }

    // Now the actions
    if(block.code.flags.contains("p")) {
        process.stdout.write(result);
    }

    block.execute_children(data, callback);
}