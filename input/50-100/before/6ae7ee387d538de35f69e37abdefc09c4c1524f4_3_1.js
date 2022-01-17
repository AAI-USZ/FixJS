function(profile) {
            var configFirstName = [sakai_conf.Profile.userFirstNameDisplay];
            var nameToReturn = "";

            if (profile &&
                profile.basic &&
                profile.basic.elements &&
                profile.basic.elements[configFirstName] !== undefined &&
                profile.basic.elements[configFirstName].value !== undefined) {
                nameToReturn += profile.basic.elements[configFirstName].value;
            }

            return sakai_util.Security.saneHTML($.trim(nameToReturn));
        }