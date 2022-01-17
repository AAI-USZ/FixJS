function() {
        var i;
        var nodeFilterYear = Y.one('#filterYear')
        if(nodeFilterYear != null) {nodeFilterYear.on('change', this.filterYear, this);}
        var nodeFilterTeacher = Y.one('#filterTeacher')
        if(nodeFilterTeacher != null)  {nodeFilterTeacher.on('change', this.filterTeacher, this);}
        var nodeFilterCategory = Y.one('#filterCategory')
        if(nodeFilterCategory != null) {nodeFilterCategory.on('change', this.filterCategory, this);}

    }