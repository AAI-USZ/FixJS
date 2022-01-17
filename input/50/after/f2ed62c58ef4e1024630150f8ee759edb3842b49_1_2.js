function (address) {
                self.model.set('loc_description_from_google', address.formatted_address);
                // only set user address from location if user hasn't manually entered it
                if (!self.model.get('loc_description_from_user')) {
                    self.model.set('loc_description_from_user', address.formatted_address);
                }
            }