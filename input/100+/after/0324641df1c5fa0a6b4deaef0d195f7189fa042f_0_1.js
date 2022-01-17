function($this, value) {
            var data = $this.data('slider'),
                steppedValue = value;

            if (!data) return;

            if (data.step > 1) {
                steppedValue = steppedValue + (steppedValue % data.step);
            }

            data.value = steppedValue;
            $this.data('slider', data);

            var left = data.indicatorWidth * steppedValue * data.inverseInterval;
            data.$indicator[0].style.width = left + 'px';
            data.$handle[0].style.marginLeft = left - data.halfHandleWidth + 'px';
        }