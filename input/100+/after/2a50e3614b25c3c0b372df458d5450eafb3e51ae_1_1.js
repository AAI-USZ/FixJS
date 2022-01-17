function(Backbone, $, NavView, SearchView, AboutView, KanjiView, KanjiModel) {
  'use strict';

  var AppRouter;

  /**
   * @constructor
   */
  AppRouter = Backbone.Router.extend({

    routes: {
      '':                   'search',
      'search':             'search',
      'about':              'about',
      'kanji/:character':   'kanji',
      '*actions':           'defaultRoute'
    },

    /**
     * Initializes all the views used by the app at load time.
     * @param {Object} options
     */
    initialize: function (options) {
      this.currentView = null;
      this.container = $('#main-container');
      this.navView = new NavView({ router: this });
      this.searchView = new SearchView({ router: this, renderOnce: true });
      this.aboutView = new AboutView({ renderOnce: true });
    },

    /**
     * @private
     * Shows a view. Disposes it if needed. Keeps track of current view.
     * @param {Backbone.View}
     */
    showView: function (view) {
      var el;
      // Only dispose views that can be rendered multiple times,
      // otherwise just detatch the dom with events in tact.
      if (this.currentView) {
        if (this.currentView.options.renderOnce) {
          this.currentView.$el.detach();
        } else {
          this.disposeView(this.currentView);
        }
      }
      // If it's a "renderOnce" view just reappend the element,
      // otherwise rerender the view.
      if (view.options.renderOnce) {
        if (view.options.hasRendered) {
          el = view.el;
        } else {
          view.options.hasRendered = true;
        }
      }
      this.container.append(el || view.render().el);
      this.currentView = view;
    },

    /**
     * @private
     * Dispose of a view by removing all its handlers, deleting its
     * model/collection, and removing all model/collection handlers it has.
     * @param {Backbone.View}
     */
    disposeView: function (view) {
      if (!view) {
        return;
      }
      // Remove all backbone listeners to the view.
      view.off();
      // Remove from dom and remove all dom events.
      view.remove();
      // Remove any model listeners for the view's context.
      if (view.model) {
        view.model.off(null, null, view);
        delete view.model;
      }
      // Remove any collection listeners for the view's context.
      if (view.collection) {
        view.model.off(null, null, view);
        delete view.collection;
      }
    },

    // ROUTES

    /**
     * @private
     * Route for the Search/Home page.
     */
    search: function () {
      this.showView(this.searchView);
    },

    /**
     * @private
     * Route for the About page.
     */
    about: function () {
      this.showView(this.aboutView);
    },

    /**
     * @private
     * Route for the Kanji detail page.
     */
    kanji: function (character) {
      this.showView(
        new KanjiView({model: new KanjiModel({ id: character })})
      );
    },

    /**
     * @private
     * Route that defaults to the Home page if if no matching route was found.
     */
    defaultRoute: function (actions) {
      // No route.
      this.navigate('', { trigger: true, replace: true });
    }

  });


  return {

    /**
     * @public
     * Initializes the router.
     */
    initialize: function () {
      var appRouter = new AppRouter();
      Backbone.history.start({ pushState: true });
    }

  };

}