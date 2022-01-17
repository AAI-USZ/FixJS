function(

    declare,

    string,

    domAttr,

    query,

    format,

    List

) {



    return declare('Mobile.SalesLogix.Views.Address.List', [List], {

        //Templates

        rowTemplate: new Simplate([

            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',

            '<div class="list-item-static-selector">',

                '<img src="{%: $$.icon %}" alt="icon" class="icon" />',

            '</div>',

            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',

            '</li>'

        ]),

        itemTemplate: new Simplate([

            '<h3>{%: $.$descriptor %}</h3>',

            '<h4>{%= Mobile.SalesLogix.Format.address($, true) %}</h4>'

        ]),



        //Localization

        titleText: 'Addresses',



        //View Properties        

        detailView: null,

        icon: 'content/images/icons/Map_24.png',

        id: 'address_list',

        security: null, //'Entities/Address/View',

        insertSecurity: 'Entities/Address/Add',

        insertView: 'address_edit',

        resourceKind: 'addresses',



        formatSearchQuery: function(searchQuery) {

            return string.substitute('(Description like "${0}%" or City like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);

        },

        // Disable Add/Insert on toolbar

        createToolLayout: function() {

            return this.tools || (this.tools = {

                tbar: []

            });

        },

        selectEntry: function(params) {

            var row = query(params.$source).closest('[data-key]')[0],

                key = row ? domAttr.get(row, 'data-key') : false;



            if (this._selectionModel && key)

                App.showMapForAddress(format.address(this.entries[key], true, ' '));

        }

    });

}