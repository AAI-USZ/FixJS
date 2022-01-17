function(a,b){
        return _.indexOf(self.state.get('columnsOrder'),a.id) > _.indexOf(self.state.get('columnsOrder'),b.id);
      }