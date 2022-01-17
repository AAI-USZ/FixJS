function (key, element, resourceTable) {

    this.element = element;

    this.resourceTable = resourceTable;



    element.change(function () {

        var filter = {};

        filter[key] = element.val();

        resourceTable.filter(filter);

    });

}