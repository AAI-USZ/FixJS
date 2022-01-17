function (expected) {
                        var i;
                        for (i = 0; i < this.actual.length; ++i) {
                            if (this.actual[i].isDirectory && this.actual[i].name === expected) {
                                return true;
                            }
                        }
                        return false;
                    }