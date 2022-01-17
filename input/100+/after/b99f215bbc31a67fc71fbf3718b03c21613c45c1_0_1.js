function(params)
  {
    // Plugin support.
    pulse.plugins.invoke(
      'pulse.Engine',
      'init',
      pulse.plugin.PluginCallbackTypes.onEnter,
      this,
      arguments);

    params = pulse.util.checkParams(params,
    {
      gameWindow: 'gameWindow',
      size: {width: 0, height: 0}
    });

    /**
     * The game window element.
     * @type {DOMElement}
     */
    this.gameWindow = null;


    this.focused = false;

    /**
     * Whether the game is currently hidden and should ignore window events.
     * @type {Boolean}
     * @default false
     */
    this.hidden = false;

    //Create game window
    if(typeof params.gameWindow === 'object') {
      this.gameWindow = params.gameWindow;
    } else {
      this.gameWindow = document.getElementById(params.gameWindow);
    }

    /**
     * The current size of the game.
     * @type {size}
     */
    this.size = params.size;

    // Attempt to get the width from the specified container.
    if((this.size.width === 0 || this.size.width === undefined) ||
       (this.size.height === 0 || this.size.height === undefined)) {
      if(this.gameWindow) {
        var parentWidth = parseInt(this.gameWindow.style.width, 10);
        var parentHeight = parseInt(this.gameWindow.style.height, 10);

        if(parentWidth) {
          this.size.width = parentWidth;
        }

        if(parentHeight) {
          this.size.height = parentHeight;
        }
      }
    }

    // If the width still isn't set, set it to 640
    if(this.size.width === 0) {
      this.size.width = 640;
    }

    // If the height still isn't set, set it to 480
    if(this.size.height === 0) {
      this.size.height = 480;
    }

    /**
     * @private
     * Private properties of the visual node. Should not need or use these.
     * @type {object}
     */
    this._private = { };

    /**
     * @private
     * A div to hold scenes. Prevents issues based on unknown parameters
     * of the user-supplied container element.
     * @type {HTMLDiv}
     */
    this._private.mainDiv = document.createElement('div');
    this._private.mainDiv.style.position = 'absolute';
    this._private.mainDiv.style.width = this.size.width + 'px';
    this._private.mainDiv.style.height = this.size.height + 'px';
    this._private.mainDiv.style.overflow = 'hidden';
    this._private.mainDiv.tabIndex = 1;

    this.gameWindow.appendChild(this._private.mainDiv);

    /**
     * Scene manager handles adding, remove, activating, and deactivating
     * scenes.
     * @type {pulse.SceneManager}
     */
    this.scenes = new pulse.SceneManager({
      gameWindow: this._private.mainDiv
    });

    /**
     * Master time of the engine. This holds how long the engine has been
     * running.
     * @type {number}
     */
    this.masterTime = 0;

    /**
     * The length of time inbetween setInterval calls.
     * @type {number}
     */
    this.tick = 100;

    /**
     * External loop callback that will be called once every game loop.
     * @type {function}
     */
    this.loopLogic = null;

    /**
     * @private
     * The current time in milliseconds since epoch.
     * @type {number}
     */
    this._private.currentTime = new Date().getTime();

    /**
     * @private
     * The last time the game loop was called in milliseconds since epoch.
     * @type {number}
     */
    this._private.lastTime = this._private.currentTime;

    // Plugin support.
    pulse.plugins.invoke(
      'pulse.Engine',
      'init',
      pulse.plugin.PluginCallbackTypes.onExit,
      this,
      arguments);
  }