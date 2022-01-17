function () {
            if (!this.sampleView) {
                this.sampleView = new SampleView();
                this.showView(this.sampleView, '.container'); // Call common method to initialize it and render it.
            }
        }