function() {

  // Allow them to provide arguments based off of the DOM attributes.
  jQuery.each(this.context[0].attributes, (function(player) {
    return function(index, attr) {
      player.options[attr.name] = player.options[attr.name] || attr.value;
    };
  })(this));

  // Make sure we provide default options...
  this.options = jQuery.extend({
    id: 'player',
    build: false,
    wmode: 'transparent',
    preload: true,
    autoplay: false,
    autoload: true,
    loop: false,
    width: '100%',
    height: '350px',
    debug: false,
    volume: 80,
    files: null,
    file: '',
    preview: '',
    attributes: {},
    logo: '',
    link: '',
    width: '100%',
    height: '100%'
  }, this.options);

  // Call the minplayer display constructor.
  minplayer.display.prototype.construct.call(this);

  // Set the plugin name within the options.
  this.options.pluginName = 'player';

  /** The controller for this player. */
  this.controller = this.create('controller');

  /** The play loader for this player. */
  this.playLoader = this.create('playLoader');

  // Set the focus of the element based on if they click in or outside of it.
  minplayer.click(document, (function(player) {
    return function(event) {
      var target = jQuery(event.target);
      var focus = !(target.closest('#' + player.options.id).length == 0);
      minplayer.get.call(this, player.options.id, null, function(plugin) {
        plugin.onFocus(focus);
      });
    };
  })(this));

  /** Add the logo for the player. */
  if (this.options.logo && this.elements.logo) {

    var code = '';
    if (this.options.link) {
      code += '<a target="_blank" href="' + this.options.link + '">';
    }
    code += '<img src="' + this.options.logo + '" >';
    if (this.options.link) {
      code += '</a>';
    }
    this.logo = this.elements.logo.append(code);
  }

  /** Variable to store the current media player. */
  this.currentPlayer = 'html5';

  // Add key events to the window.
  this.addKeyEvents();

  // Now load these files.
  this.load(this.getFiles());

  // The player is ready.
  this.ready();
}