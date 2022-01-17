function(data) {
                $('#cm-bubbletree').empty();
                var currency = opts.currency || data.currency;
                self.bt = new BubbleTree({
                    data: data,
                    container: '#cm-bubbletree',
                    bubbleType: 'icon',
                    nodeClickCallback: onNodeClick,
                    firstNodeCallback: onNodeClick,
                    rootPath: 'img/functions/',
                    tooltip: {
                        qtip: true,
                        delay: 800,
                        content: function(node) {
                            var famount = OpenSpending.Utils.formatAmountWithCommas(node.amount, 0, currency);
                            return [node.label, '<div class="amount">'+famount+'</div>'];
                        }
                    },
                    bubbleStyles: opts.bubbleStyles,
                    clearColors: true // remove all colors coming from OpenSpending API
                });
            }