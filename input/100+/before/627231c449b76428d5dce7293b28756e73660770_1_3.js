function (section, viewModel) {

    var self = this;



    this.name = ko.observable(section.name); // Name of a section. Can be used to show some title over section.

    this.uniqueId = _.uniqueId('section_'); // Unique ID generated at runtime and stored on the section Div.



    this.tiles = ko.observableArray(section.tiles);

    

    // Returns tiles sorted by index so that they are shown on the 

    // dashboard in right order.



    this.getTilesSorted = function () {

        return self.tiles().sort(function (left, right) {

            return left.index == right.index ? 0 :

                (left.index < right.index ? -1 : 1)

        });

    }



    this.sortedTiles = ko.computed(this.getTilesSorted, this);



    this.getTile = function(uniqueId) {

        return ko.utils.arrayFirst(self.tiles(), function(tile) {

            return tile.uniqueId == uniqueId;

        });

    }



}