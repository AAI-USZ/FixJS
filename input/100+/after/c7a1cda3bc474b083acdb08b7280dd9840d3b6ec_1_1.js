function () {

    "use strict";



    // Get a reference for an item, using the group key and item title as a

    // unique reference to the item that can be easily serialized.

    function getItemReference(item) {

        return [item.group.key, item.title];

    }



    function resolveGroupReference(key) {

        for (var i = 0; i < groupedItems.groups.length; i++) {

            if (groupedItems.groups.getAt(i).key === key) {

                return groupedItems.groups.getAt(i);

            }

        }

    }



    function resolveItemReference(reference) {

        for (var i = 0; i < groupedItems.length; i++) {

            var item = groupedItems.getAt(i);

            if (item.group.key === reference[0] && item.title === reference[1]) {

                return item;

            }

        }

    }

    



    // This function returns a WinJS.Binding.List containing only the items

    // that belong to the provided group.

    function getItemsFromGroup(group) {

        return list.createFiltered(function (item) { return item.group.key === group.key; });

    }



    var list = new WinJS.Binding.List();



    var groupedItems = list.createGrouped(

        function groupKeySelector(item) { return item.group.key; },

        function groupDataSelector(item) { return item.group; }

    );



    var getxItems = function (x) {



        var ltdList = list.createFiltered(function (item) {

            var key = item.group.key;

            if (item.innerIndex < x) {

                return true;

            }

            return false;

        });



        ltdList = ltdList.createGrouped(

            function groupKeySelector(item) { return item.group.key; },

            function groupDataSelector(item) { return item.group; }

        );



        return ltdList;

    };



    var getHomeItemReference = function (index) {

        

    };



    // Expose the config for general use through the app.

    var factoryconfig = Joshfire.factory.config;



    // Use Joshfire Factory data sources for the moment.

    // See http://developer.joshfire.com/doc/dev/develop/datasources

    // They are defined in the bootstrap.js file

    var datasources = Joshfire.factory.getDataSource("main");



    // note that external <script> cannot be called on a local context, so no JSONP

    // http://msdn.microsoft.com/library/windows/apps/Hh452745

    // http://msdn.microsoft.com/library/windows/apps/Hh465373

    for (var dsNb = 0; dsNb < datasources.children.length; dsNb++) {

        var group = { key: "main" + dsNb, title: datasources.children[dsNb].name, index: dsNb, length: 0 };



        datasources.children[dsNb].find({}, function (g) {

            return function (err, data) {

                // Process data entries in data.entries

                var k = 0;

                g.length = data.entries.length;

                data.entries.forEach(function (item) {

                    item.group = g;

                    // index inside its datasource

                    item.innerIndex = k;

                    list.push(item);



                    k++;

                });

            };

        }(group)

        );

    }



    WinJS.Namespace.define("Data", {

        items: groupedItems,

        groups: groupedItems.groups,

        getItemsFromGroup: getItemsFromGroup,

        getItemReference: getItemReference,

        resolveGroupReference: resolveGroupReference,

        resolveItemReference: resolveItemReference,



        homeItems: getxItems,

        getHomeItemReference: getHomeItemReference,



        appConfig: factoryconfig.app

    });

}