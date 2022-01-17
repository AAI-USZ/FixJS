function(field) {
                    if (field.name.length > 29) {
                        throw new Error('Oracle field names limited to 30 characters.');
                    }
                    if (!field.reserved) {
                        srcFields[field.name] = field;
                    }
                }