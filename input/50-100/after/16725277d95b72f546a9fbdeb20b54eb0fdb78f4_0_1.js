function(error) {
        if (tries > 10) {
            errorFinish();
        } else {
            tries++;
            options.logger.error("asset retry(" + tries + ") '" + url +"'", error);
            setTimeout(fetchFileAndFinish, 500);
        }
    }