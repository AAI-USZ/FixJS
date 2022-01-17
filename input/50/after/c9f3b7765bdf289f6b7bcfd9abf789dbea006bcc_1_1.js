function () {
        //On init, check for change of numberfields in the field container heightWeightID in the view registrationbmi
        this.control({
            'registrationbmi #heightWeightID numberfield': {
                change: {
                    fn: this.getBMIData,
                    buffer: 100
                }
            }

        })
    }