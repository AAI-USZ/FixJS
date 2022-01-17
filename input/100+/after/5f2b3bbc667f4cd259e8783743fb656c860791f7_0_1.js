function() {
        forth.stackTrace.push(this.name);

        var args = forth.stack.popList(this.types.length);

        for (var i = 0; i < this.types.length; i++) {
            var type = this.types[i];
            if (type != 'any')
                forth.checkType(args[i], type);
        }

        var result = this.func.apply(null, args);
        forth.stack.pushList(result);

        forth.stackTrace.pop();
    }