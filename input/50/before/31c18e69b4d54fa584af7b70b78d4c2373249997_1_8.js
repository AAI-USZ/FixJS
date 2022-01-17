function (child) {
                    if (child.get('xtype') === 'button' && S.inArray(child.get('id'), buttons)) {
                        child.set('disabled', !enable);
                    }
                }