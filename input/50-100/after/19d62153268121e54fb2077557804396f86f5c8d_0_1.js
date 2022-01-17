function (content) {
            for(var key in validAlias) {
                var regex = new RegExp(key, "g");
                content = content.replace(regex, function() { return validAlias[key] });
            }
            return content.replace(/:([a-z0-9\+\-_]+):/g, emojiReplacer);
        }