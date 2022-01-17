function(params)
    {
        if (!this.checkLogin()) return;

        if (params.email != undefined) { this.user.email = params.email; }
        if (params.name != undefined) { this.user.name = params.name; }
        if (params.password != undefined && params.password != '') { this.user.password = this._getHash(params.password); }
        if (params.gender != undefined) { this.user.gender = params.gender; }
        if (params.birthdayDay != undefined && params.birthdayMonth != undefined && params.birthdayYear != undefined) { this.user.birthday = new Date(params.birthdayYear, params.birthdayMonth - 1, params.birthdayDay); }
        if (params.profile_type != undefined) { this.user.profile_type = params.profile_type; }
        if (params.biography != undefined) { this.user.biography = params.biography; }
        
        var image;
        chain.call(this, 
            function() 
            {
                if (params.files.avatar && params.files.avatar.size) {
                    image = ImageManip(params.files.avatar.path);
                    image.size(this.next);
                } else {
                    this.last();
                }
            }, 
            function(error, size) 
            {
                if (error) return this.error('Unable to process avatar.  The file is not a valid image. ' + error);
                
                this.cropResize( image, size, Config.user.avatar_size, Config.user.avatar_size );
                
                image.write(this.user.avatar_path, this.next);
            }, 
            function(error) 
            {
                if (error) return this.error('Unable to save avatar.' + error);
                
                // Save the changes made
                this.user.save();
                 
                return this.output('edit', { saved: 1 });
            }
        );
    }