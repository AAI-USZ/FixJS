function(code) {
        // a trick to associate Error's sourceId with file
        code += ";throw new Error('__sourceId__');";
        try {
            var fn = new Function('require', 'exports', 'module', code);
            fn(this._getRequire(), this.exports, this);
        } catch (e) {
            // assign source id (check if already assigned to avoid reassigning
            // on exceptions propagated from other files)
            if (!sourceIds.hasOwnProperty(e.sourceId)) {
                sourceIds[e.sourceId] = this.filename;
            }
            // if it's not the error we added, propagate it
            if (e.message !== '__sourceId__') {
                throw e;
            }
        }
    }