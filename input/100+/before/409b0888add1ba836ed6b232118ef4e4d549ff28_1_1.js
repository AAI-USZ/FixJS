function(code, word) {
    var ip = 0;
    while (ip < code.length) {
        var cmd = code[ip];
        switch (cmd.op) {
        case 'number':
        case 'addr': // variable 'address', a string
            forth.stack.push(cmd.value);
            ip++;
            break;
        case 'call':
            cmd.value.run();
            ip++;
            break;
        case 'goto':
            ip = cmd.value;
            break;
        case 'goto-on-false': {
            var val = forth.stack.pop();
            forth.checkType(val, 'boolean');
            if (!val)
                ip = cmd.value;
            else
                ip++;
            break;
        }
        case 'recurse':
            word.run();
            ip++;
            break;
        default:
            throw 'bug: bad opcode '+cmd.op;
        }
    }
}