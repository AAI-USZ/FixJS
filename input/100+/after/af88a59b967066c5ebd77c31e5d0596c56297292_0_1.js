function($, _, Backbone, Handlebars, aboutTpl) {
  'use strict';

  var AboutView;

  /**
   * @constructor
   */
  AboutView = Backbone.View.extend({

    tagName: 'div',
    id: 'about-page',

    /**
     * @private
     */
    template: Handlebars.compile(aboutTpl),

    /**
     * @private
     */
    events: {
    },

    initialize: function () {
      _.bindAll(this, 'render');
    },

    /**
     * @public
     * @returns {Backbone.View}
     */
    render: function () {
      this.$el.html(this.template({
      }));

      return this;
    }

  });

  return AboutView;

}