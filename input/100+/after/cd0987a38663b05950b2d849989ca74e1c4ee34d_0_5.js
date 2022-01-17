function isEqualOrDescendant(parent, child) {
     var elem = child;

     while (elem != null) {
         if (elem == parent) {
             return true;
         }

         elem = elem.parentNode;
     }

     return false;
}