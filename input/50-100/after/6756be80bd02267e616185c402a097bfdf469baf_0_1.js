function() {
        this.control({
            // Page one
            'viewport createnewassignmentform': {
                render: this._onRenderCreateNewAssignmentForm,
            },
            'viewport createnewassignmentform textfield[name=long_name]': {
                render: this._onRenderLongName
            },
            'viewport createnewassignmentform createbutton': {
                click: this._onCreate,
            },
            'viewport createnewassignmentform radiogroup radio': {
                change: this._onDeliveryTypesSelect
            },
            'viewport createnewassignmentform checkboxfield[name=add_all_relatedstudents]': {
                change: this._onAddRelatedStudentChange
            },

            // Success page
            'viewport createnewassignment-successpanel': {
                render: this._onRenderSuccesspanel
            },
        });
    }