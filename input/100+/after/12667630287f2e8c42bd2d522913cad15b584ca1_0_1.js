function() {
        this.$style = this.elem({
            tag: 'style',
            attr: { type: 'text/css' }
        });

        this.styleRules = {
            '#frame::-webkit-scrollbar': {
                width: '16px',
                height: '16px'
            },
            '#frame::-webkit-scrollbar-thumb': {
                background: '#aaa'
            },
            '#frame::-webkit-scrollbar-track': {
                background: '#eee'
            },
            '.fdr.blinking': {
                'box-shadow': '0 0 1px 1px #999'
            },
            '.fdr .ui-slider-handle.blinking': {
                'background': '#a03',
                'border-color': '#d37',
                'border-width': '1px',
                'box-shadow': '0 0 1px 1px #999'
            },
            '.blinker.blinking': {
                'background-color': '#b03',
                'box-shadow': '0 0 1px 1px #999'
            }
        };

        for (var selector in this.styleRules) {
            this.$style.append(
                selector + '{'
            );
            var rules = this.styleRules[selector];
            for (var rule in rules) {
                this.$style.append(
                    rule + ':' + rules[rule] + ';'
                );
            }
            this.$style.append('}');
        }

        var externalStyles = ['lib/ui-slider-custom.css'];

        externalStyles.map(function(filePath) {
            $('head').append(
                this.elem({
                    tag: 'link',
                    attr: {
                        type: 'text/css',
                        rel: 'stylesheet',
                        media: 'all',
                        href: (window.appRoot || '') + filePath
                    }
                })
            );
        }.bind(this));

        // After externals, override
        $('head').append(this.$style);

    }