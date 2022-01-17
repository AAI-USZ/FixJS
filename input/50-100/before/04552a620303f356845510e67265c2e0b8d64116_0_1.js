function (item) {
            for (j = 0; j < folders.length; j++) {
                if (item.indexOf(folders[j]) !== -1) {
                    return true;
                }
            }

            return false;
        }