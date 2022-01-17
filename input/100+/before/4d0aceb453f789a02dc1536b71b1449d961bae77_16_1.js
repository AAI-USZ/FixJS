function () {
        this.control({
            'prescription [action=addPatient]': {
                click: this.displayForm
            },
            "addPatient button[action=submit]": {
                click: this.savePerson
            }
        })
    }