function (clas) {
            if (comb.isArray(clas)) {
                return this.addClasses(clas);
            } else {
                return this.addClass(clas);
            }
        }