function() {
          this.activitiesView = new UpdatingCollectionView({
            collection           : this.model.get("activities"),
            childViewConstructor : ActivityView,
            childViewTagName     : 'li'
          });
          
          //TODO this is how i tested the activity feed database, see the ActivityTest where it is hanging out not being tested.
//          var a = new Activity();
//          a.save();
        }