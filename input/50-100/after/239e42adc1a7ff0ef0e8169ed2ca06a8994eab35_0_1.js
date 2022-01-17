function() {
        // Get the tags
        this._tagUrl = phpr.webpath + 'index.php/Default/Tag/jsonGetTagsByModule/moduleName/' + phpr.module + '/id/' +
            this.id;
        this._initData.push({'url': this._tagUrl});
    }