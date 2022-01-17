function (a, b) {
            if (a['lastModified'] > b['lastModified']) {
                return 1;
            } else {
                if (a['lastModified'] === b['lastModified']) {
                    return 0;
                } else {
                    return -1;
                }
            }
        }