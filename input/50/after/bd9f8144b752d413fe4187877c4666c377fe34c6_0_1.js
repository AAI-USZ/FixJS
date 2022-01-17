function(err) {
        if (err) {
            if (err.stack) console.warn('\n' + err.stack);
            else console.warn('\n' + err.message);
        }
        task.emit('finished');
    }