function(view) {
            var values = view && view.getValues();
            if (values)
            {
                this.currentValue = this.validationValue = values;
                this.setValue(this.currentValue, false);
            }
        }