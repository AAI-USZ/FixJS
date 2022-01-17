function(e) {
            if (['INPUT', 'TEXTAREA'].contains(e.target.tagName) || $(e.target).parents().andSelf().is('.is-selectable')) {
                return true;
            } else {
                return false;
            }
        }