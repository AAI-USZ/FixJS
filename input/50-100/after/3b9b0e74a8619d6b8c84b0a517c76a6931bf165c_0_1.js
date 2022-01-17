function () {
            if (!this.sampleView) {
                require([
                    'require',
                    'views/sampleView'
                ], _.bind(function (require, SampleView) {
                    this.sampleView = new SampleView();
                    this.showView(this.sampleView, '.container');
                }, this));
            }
        }