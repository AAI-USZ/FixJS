function(){
            _.bindAll(this, 'refreshed', 'addRow');
            Teams.bind("addToList", this.addRow);
            Teams.bind("reset", this.refreshed);
        }