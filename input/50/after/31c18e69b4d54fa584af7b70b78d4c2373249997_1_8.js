function (child) {
                    if (S.inArray(child.get('id'), buttons)) {
                        child.set('disabled', !enable);
                    }
                }