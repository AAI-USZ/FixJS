function () {
            function Animal(species) {
                this.species = species || null;
            }

            Animal.prototype.getSpecies = function () {
                return this.species;
            };

            return Animal;
        }