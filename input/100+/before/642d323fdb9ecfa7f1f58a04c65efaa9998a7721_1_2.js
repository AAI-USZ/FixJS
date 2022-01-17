function() {
            if (this.$s.$story_taskbar.find('.NB-tryfeed-add:visible').length) return;
            
            var $add = $.make('div', { className: 'NB-modal-submit' }, [
              $.make('div', { className: 'NB-tryfeed-add NB-modal-submit-green NB-modal-submit-button' }, 'Add')
            ]).css({'opacity': 0});
            this.$s.$story_taskbar.find('.NB-taskbar').append($add);
            $add.animate({'opacity': 1}, {'duration': 600});
        }