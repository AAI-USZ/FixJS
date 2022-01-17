function() {
        // Summary:
        //    Init all the data before draw the form
        // Description:
        //    This function call all the needed data before the form is drawed
        //    The form will wait for all the data are loaded.
        //    Each module can overwrite this function for load the own data

        // Get the rights for other users
        this._accessUrl = phpr.webpath + 'index.php/' + phpr.module +
            '/index/jsonGetUsersRights' + '/nodeId/' + phpr.currentProjectId + '/id/' + this.id;
        this._initData.push({'url': this._accessUrl});

        // Get the tags
        this._tagUrl  = phpr.webpath + 'index.php/Default/Tag/jsonGetTagsByModule/moduleName/' +
            phpr.module + '/id/' + this.id;
        this._initData.push({'url': this._tagUrl});
    }