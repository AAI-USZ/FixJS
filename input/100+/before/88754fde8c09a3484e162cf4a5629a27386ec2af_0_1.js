function (evaluator) {
        var Stream = require('stream');
        var input = new Stream;
        input.readable = true;
        input.resume = function () {};
        input.pause = function () {};
        
        var duplex = new Stream;
        duplex.readable = true;
        duplex.writable = true;
        duplex.write = function (buf) { input.emit('data', buf) };
        duplex.end = function () { input.emit('end') };
        duplex.destroy = duplex.end;
        
        var output = new Stream;
        output.writable = true;
        var buffered = [];
        output.write = function (buf) {
            if (buffered) buffered.push(buf);
            else duplex.emit('data', buf);
        };
        output.end = function () { duplex.emit('end') };
        output.destroy = output.end;
        
        var defaultInput = true;
        var defaultOutput = true;
        
        duplex.once('pipe', function () {
            defaultInput = false;
        });
        
        duplex.pipe = function () {
            defaultOutput = false;
            return Stream.prototype.pipe.apply(this, arguments);
        };
        
        process.nextTick(function () {
            if (defaultInput) process.stdin.pipe(duplex);
            if (defaultOutput) duplex.pipe(process.stdout);
            
            buffered.forEach(function (buf) { duplex.emit('data', buf) });
            buffered = null;
        });
        
        var repl = require('repl');
        repl.start({
            input : input,
            output : output,
            eval : evaluator
        });
        
        return duplex;
    })(function (s, _, _, cb) { cb(eval(s)) }