function(key, command) {
        if(!key)
            return;
        if (typeof command == "function") {
            this.addCommand({exec: command, bindKey: key, name: key});
            return;
        }

        var ckb = this.commmandKeyBinding;
        key.split("|").forEach(function(keyPart) {
            var binding = this.parseKeys(keyPart, command);
            var hashId = binding.hashId;
            (ckb[hashId] || (ckb[hashId] = {}))[binding.key] = command;
        }, this);
    }