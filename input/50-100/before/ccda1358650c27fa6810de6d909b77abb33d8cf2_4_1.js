function() {
          fimo.page.create(fimo.views.jumblePeople(_.extend(_this.instanceArguments, {
            jumbleObjectVerbs: $('#verbs').val(),
            jumbleObjectTags: $('#tags').val()
          })));
          return false;
        }