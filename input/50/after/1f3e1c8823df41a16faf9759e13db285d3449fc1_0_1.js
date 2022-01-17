function() {
    if (App.Common.isLoggedIn()) {
      App.Ideas.newIdea.openIdeaForm(); 
      location.hash = '';
    } else {
      location.href = '/sessions/new?anchor=continue_idea'
    }
  }