function() {
            NativeButton.didSetElement.call(this);
            this['class'] = (this['class'] || '') + ' montage-Button';
        }