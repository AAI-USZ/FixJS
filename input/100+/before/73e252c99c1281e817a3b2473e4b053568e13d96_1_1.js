function(topMargin) {
        var $frame = this.elem({
            tag: 'div',
            attr: {
                id: 'frame'
            },
            css: {
                'margin-top': topMargin + 'px',
                'padding-top': '5px',
                'overflow-y': 'scroll',
                height: $(window).height() - topMargin - 5 + 'px'//'100%'
            }
        });
        var $innerFrame = this.elem({
            tag: 'div',
            css: {
                // TODO: width should be viewport based
                //       fix for scroll-down behavior
                width: '480px', // should be 12x fader width
                margin: 'auto'
            }
        });
        for (var i = 0; i < this.patt.options.stepCount; i++) {
            //console.log(idx, this.buildFader(idx));
            $innerFrame.append(
                this.buildFader(i)
            );
        }
        $frame.append($innerFrame);
        return $frame;
    }