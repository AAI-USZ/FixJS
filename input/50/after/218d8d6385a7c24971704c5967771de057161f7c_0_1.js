function() {
      var id = obj[self.identifier]
      return self.target.find({where: {'id': id}});
    }