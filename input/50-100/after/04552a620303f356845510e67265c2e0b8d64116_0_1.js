function (item) {
            // Shaker and mojito rollups are not compatible, warn the user if needed
            if (item.indexOf('/rollup.') !== -1) {
                logger.error('incompatible mojito rollup found: ' + item);
            }

            for (j = 0; j < folders.length; j++) {
                if (item.indexOf(folders[j]) !== -1) {
                    return true;
                }
            }

            return false;
        }