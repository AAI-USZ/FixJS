function(target) {
            var protoDisabled = $(target).attr('disabled'),
                modifyDisabled = $(target).attr('ks-radio-disabled');
            return protoDisabled === 'disabled' || modifyDisabled === 'disabled';
        }