function() {
      var declaredInName;
      declaredInName = this.nameAssignment != null ? beingDeclared(this.nameAssignment) : [];
      return nub(declaredInName.concat((typeof name !== "undefined" && name !== null ? [name] : [])));
    }