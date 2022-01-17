function(error) {
        if (tries > 10) {
            errorFinish();
        } else {
            console.error(error.message);
            console.error(error.stack);
            tries++;
            console.error("asset retry(" + tries + ") '" + url +"'");
            setTimeout(fetchFileAndFinish, 500);
        }
    }