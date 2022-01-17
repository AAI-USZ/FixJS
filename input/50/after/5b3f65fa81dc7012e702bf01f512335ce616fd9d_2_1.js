function(part) {
        result += part instanceof Blob ? part.result : part;
        getProps(part);
    }