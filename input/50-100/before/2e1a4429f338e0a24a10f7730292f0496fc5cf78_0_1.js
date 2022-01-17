function() {
            var view = App.getPrimaryActiveView();
            if (view)
            {
                var value = view.getValues();
                this.currentValue = this.validationValue = value;
                this.setValue(this.currentValue, false);
            }
        }