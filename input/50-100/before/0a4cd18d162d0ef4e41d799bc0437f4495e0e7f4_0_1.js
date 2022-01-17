function() {
      return nub((beingDeclared(this.nameAssignment)).concat((typeof name !== "undefined" && name !== null ? [name] : [])));
    }