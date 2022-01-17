function (c, name) {
        lines.push('Host ' + name);
        c.user && lines.push('  User ' + c.user);
        c.addr && lines.push('  Hostname ' + c.addr);
        c.port && lines.push('  Port ' + c.port);
        c.via && lines.push('  ProxyCommand ssh -F ' + config.sshConfig + ' ' + c.via + ' nc -w 1800 %h %p');

        var auths = [];
        if (c.key) {
            var keyFile = temp.path({suffix: '.pem'});
            fs.writeFileSync(keyFile, c.key);
            fs.chmodSync(keyFile, 384 /* 0600 octal */);
            lines.push('  IdentityFile ' + keyFile);
            auths.push('publickey');
            lines.push('  PubkeyAuthentication yes');
        } else {
            lines.push('  PubkeyAuthentication no');
        }

        if (c.password) {
            lines.push('  PasswordAuthentication yes');
            lines.push('  KbdInteractiveAuthentication yes');
        } else {
            lines.push('  PasswordAuthentication no');
            lines.push('  KbdInteractiveAuthentication no');
        }

        if (name === config.main) {
            var forwards = forwardConfig(config.forwards);
            lines.push.apply(lines, forwards);
        }
    }