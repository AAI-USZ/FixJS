function (start, length) {
            return this.syllables.slice(start, length).map(function (x) {
                return x.text;
            });
        }