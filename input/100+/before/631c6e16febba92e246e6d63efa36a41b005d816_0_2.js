function _loadCustomOptions(optionFiles) {
            console.log("loaded custom javascript options:\n",optionFiles);
            for(var i in optionFiles) {
                require(optionFiles[i]);
            }
        }