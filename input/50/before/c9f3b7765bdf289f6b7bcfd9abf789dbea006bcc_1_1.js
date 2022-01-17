function () {
        console.log('BMI controller init');
        //On init, check for change of numberfields in the field container heightWeightID in the view with alias bmicalculator
        this.control({
            'bmicalculator #heightWeightID numberfield': {
                change: {
                    fn: this.getBMIData,
                    buffer: 100
                }
            }

        })
    }