function stub() {
        stub.called = true;
        if (Object.prototype.toString.call(stub.args) === '[object Array]') {
            stub.args.push(arguments);
        }
        else if (stub.args) {
            stub.args = [ stub.args, arguments ];
        }
        else {
            stub.args = arguments;
        }
        stub.thisArg = this;
        return returnValue;
    }