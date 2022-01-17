function(data) {
      var link;
      link = this.updateModels(data);
      console.log('link', link);
      if (link) {
        linksCollection.add(link);
        return link.save();
      }
    }