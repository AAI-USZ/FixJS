function($, _, Backbone, Handlebars, navTpl) {
  'use strict';

  var NavView;

  /**
   * @constructor
   */
  NavView = Backbone.View.extend({

    /**
     * @private
     */
    template: Handlebars.compile(navTpl),

    /**
     * @private
     */
    events: {
      'click .main-nav': 'onNavClick'
    },

    /**
     * Used to optionally auto-build the navigation.
     * Modify these as necessary.
     * @private
     */
    navItems: [
      { route: '', display: 'Home' },
      { route: 'about', display: 'About' }
    ],

    el: $('#main-navbar'),

    initialize: function () {
      _.bindAll(this, 'render', 'onNavClick', 'onNavigate');

      this.router = this.options.router;
      this.router.on('all', this.onNavigate);
    },

    /**
     * @public
     * @param {String} activeLink The path of the navigation link to activate.
     * @returns {Backbone.View}
     */
    render: function (activeLink) {
      this.$el.html(this.template({
        active: activeLink,
        navItems: this.navItems
      }));

      return this;
    },

    // EVENT HANDLERS

    /**
     * @private
     * @param {Event} e
     */
    onNavClick: function (e) {
      this.router.navigate(
        this.$(e.target).attr('href'),
        { trigger: true });
      e.preventDefault();
    },

    /**
     * @private
     * @param {Event} e
     */
    onNavigate: function (e) {
      this.render(e.replace('route:', ''));
    }

  });

  return NavView;

}