function(record) {
        this.periodRecord = record;
        //this.application.fireEvent('periodSuccessfullyLoaded', record);
        this.getActions().setTitle(record.get('long_name'));
        this.setBreadcrumb(this.periodRecord);
        this._setMenuLabels();
        this.getAdminsbox().setBasenodeRecord(this.periodRecord, this._getPath());
        this.getBasenodehierlocation().setLocation(this.periodRecord);
    }