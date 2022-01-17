function(nodes) {
            var tagged = arr(),
                count = 0,
                i = nodes.length,
                item;

            while (i--) {
                item = nodes[i];
                if (item && !item.hasOwnProperty(uniqueTag)) {
                    item[uniqueTag] = count;
                    tagged[count++] = item;
                }
            }

            // remove the tags (TODO: is this necessary?)
            i = tagged.length;
            while (i--) {
                delete tagged[i][uniqueTag];
            }

            return tagged;
        }