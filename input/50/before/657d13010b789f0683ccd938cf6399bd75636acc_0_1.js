function(data) {
      var link;
      link = this.updateModels(data);
      linksCollection.add(link);
      return link.save();
    }