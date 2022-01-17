function (name) {
        return name == 'scala.Any' ||
               name == 'scala.AnyRef' ||
               name == 'scala.Predef.any2stringfmt' ||
               name == 'scala.Predef.any2stringadd' ||
               name == 'scala.Predef.any2ArrowAssoc' ||
               name == 'scala.Predef.any2Ensuring' ||
               name == 'scala.collection.TraversableOnce.alternateImplicit'
    }