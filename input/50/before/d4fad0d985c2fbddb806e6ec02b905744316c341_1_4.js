function(id, command, label, icon) {
        return jQuery("<label for=\"" + id + "\" class=\"" + command + "_button\" title=\"" + label + "\"><i class=\"" + icon + "\"></i></label>");
      }