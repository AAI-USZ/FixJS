function (expand, url, termMap, directModel) {
        var map = fluid.copy(termMap);
        map = fluid.transform(map, function (entry) {
            var encode = false;
            if (entry.indexOf(eUC) === 0) {
                encode = true;
                entry = entry.substring(eUC.length);
            }
            if (entry.charAt(0) === "%") {
                entry = fluid.get(directModel, entry.substring(1));
            }
            if (encode) {
                entry = encodeURIComponent(entry);
            }
            return entry;
        });
        var replaced = fluid.stringTemplate(url, map);
        replaced = expand(replaced);
        return replaced;
    }