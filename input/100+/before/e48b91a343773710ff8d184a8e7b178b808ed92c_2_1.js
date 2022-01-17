function(record) {
        this._detailsPanel.removeAll();
        this._detailsPanel.expand();
        var assignmentgroups = [];
        Ext.Object.each(record.groupsByAssignmentId, function(assignmentid, group) {
            if(group.assignmentGroupRecord != null) {
                assignmentgroups.push(group.assignmentGroupRecord.data);
            }
        }, this);
        this._detailsPanel.setTitle(this.selectedStudentTitleTpl.apply(record.data));
        this._detailsPanel.add({
            xtype: 'statistics-overviewofsinglestudent',
            assignment_store: record.assignment_store,
            assignmentgroups: assignmentgroups,
            username: record.get('username'),
            full_name: record.get('full_name'),
            labelKeys: record.get('labelKeys'),
            border: false,
            frame: false
        });
    }