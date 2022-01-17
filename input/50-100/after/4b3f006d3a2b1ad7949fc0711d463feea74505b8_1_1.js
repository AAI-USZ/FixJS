function(e) {
            var target = Ember.$(e.target);
            return ['INPUT', 'TEXTAREA'].contains(e.target.tagName) ||
                target.parents().andSelf().is('.is-selectable') ||
                target.attr('contenteditable') === 'true';
        }