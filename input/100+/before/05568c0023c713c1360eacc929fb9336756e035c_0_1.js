function() {

  /**
   * current user running app
   */
  cdb.admin.User = Backbone.Model.extend({});


  /**
   * contains table meta information like name
   * rows and so on
   */
  cdb.admin.Table = cdb.ui.common.TableProperties.extend({
    idAttribute: 'name'
  });

  /**
   * tables available for given user
   * usage:
   * var tables = new cbd.admin.Tables()
   * tables.fetch();
   */
  cdb.admin.Tables = Backbone.Collection.extend({

    model: cdb.admin.Table,

    url: function() {
      //TODO: use current host
      //var name = this.options.user.get('name');
      return '/api/v1/tables';
    },

    parse: function(response) {
      return response.tables;
    },

    initialize: function() {
    }
  });

}