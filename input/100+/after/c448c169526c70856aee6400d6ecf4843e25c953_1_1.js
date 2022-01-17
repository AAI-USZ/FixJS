function () {
            var self = this,buttonTarget = self.get('buttonTarget'),
                uploader = self.get('uploader'),
                cf = self.get('authConfig'),
                config = S.form.parseConfig(buttonTarget,dataName.AUTH);
            S.mix(config,cf);
            self.set('authConfig',config);
            if(S.isEmptyObject(config)) return false;
            auth = new Auth(uploader,{rules : config});
            uploader.set('auth',auth);
            return auth;
        }