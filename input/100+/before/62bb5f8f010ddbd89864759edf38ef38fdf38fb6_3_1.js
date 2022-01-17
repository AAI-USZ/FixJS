function(protocol, resourceManager, settings, mapData) {
  /**
   * @type {!dotprod.Protocol}
   * @private
   */
  this.protocol_ = protocol;

  /**
   * @type {!dotprod.ResourceManager}
   * @private
   */
  this.resourceManager_ = resourceManager;

  /**
   * @type {!Object}
   * @private
   */
  this.settings_ = settings;

  /**
   * @type {!dotprod.input.Keyboard}
   * @private
   */
  this.keyboard_ = new dotprod.input.Keyboard();

  /**
   * @type {!HTMLCanvasElement}
   * @private
   */
  this.canvas_ = /** @type {!HTMLCanvasElement} */ (goog.dom.createElement('canvas'));
  this.canvas_.className = dotprod.Game.CANVAS_CLASS_NAME_;
  this.canvas_.width = dotprod.Game.WIDTH_;
  this.canvas_.height = dotprod.Game.HEIGHT_;

  /**
   * @type {!dotprod.Camera}
   * @private
   */
  this.camera_ = new dotprod.Camera(this, /** @type {!CanvasRenderingContext2D} */ (this.canvas_.getContext('2d')));

  /**
   * @type {!dotprod.Map}
   * @private
   */
  this.map_ = new dotprod.Map(this, mapData);

  /**
   * @type {!dotprod.ChatMessages}
   * @private
   */
  this.chat_ = new dotprod.ChatMessages();

  /**
   * @type {!dotprod.PrizeIndex}
   * @private
   */
  this.prizeIndex_ = new dotprod.PrizeIndex(this);

  /**
   * @type {!dotprod.ProjectileIndex}
   * @private
   */
  this.projectileIndex_ = new dotprod.ProjectileIndex();

  /**
   * @type {!dotprod.EffectIndex}
   * @private
   */
  this.effectIndex_ = new dotprod.EffectIndex();

  /**
   * @type {!dotprod.Notifications}
   * @private
   */
  this.notifications_ = new dotprod.Notifications();

  /**
   * @type {!dotprod.PlayerIndex}
   * @private
   */
  this.playerIndex_ = new dotprod.PlayerIndex(new dotprod.entities.LocalPlayer(this, this.settings_['name'], 0 /* ship */, this.camera_));

  /**
   * @type {!dotprod.views.ChatView}
   * @private
   */
  this.chatView_ = new dotprod.views.ChatView(this, this.chat_);

  /**
   * @type {!dotprod.views.DebugView}
   * @private
   */
  this.debugView_ = new dotprod.views.DebugView(this, this.camera_);

  /**
   * @type {!Array.<dotprod.layers.Layer>}
   * @private
   */
  this.layers_ = [
      new dotprod.layers.StarLayer(),
      new dotprod.layers.MapLayer(this),
      new dotprod.layers.ProjectileLayer(this.map_, this.playerIndex_, this.projectileIndex_),
      new dotprod.layers.ShipLayer(this.playerIndex_),
      new dotprod.layers.EffectLayer(this.effectIndex_),
      new dotprod.layers.NotificationLayer(this.notifications_),
      new dotprod.layers.ChatLayer(this.chat_),
      new dotprod.layers.RadarLayer(this),
      new dotprod.layers.ScoreboardLayer(this)
    ];

  /**
   * @type {number}
   * @private
   */
  this.lastTime_ = goog.now();

  /**
   * @type {number}
   * @private
   */
  this.tickResidue_ = 0;

  this.protocol_.registerHandler(dotprod.Protocol.S2CPacketType.PLAYER_ENTERED, goog.bind(this.onPlayerEntered_, this));
  this.protocol_.registerHandler(dotprod.Protocol.S2CPacketType.PLAYER_LEFT, goog.bind(this.onPlayerLeft_, this));
  this.protocol_.registerHandler(dotprod.Protocol.S2CPacketType.PLAYER_POSITION, goog.bind(this.onPlayerPosition_, this));
  this.protocol_.registerHandler(dotprod.Protocol.S2CPacketType.PLAYER_DIED, goog.bind(this.onPlayerDied_, this));
  this.protocol_.registerHandler(dotprod.Protocol.S2CPacketType.CHAT_MESSAGE, goog.bind(this.onChatMessage_, this));
  this.protocol_.registerHandler(dotprod.Protocol.S2CPacketType.SHIP_CHANGE, goog.bind(this.onShipChanged_, this));
  this.protocol_.registerHandler(dotprod.Protocol.S2CPacketType.SCORE_UPDATE, goog.bind(this.onScoreUpdated_, this));
  this.protocol_.registerHandler(dotprod.Protocol.S2CPacketType.PRIZE_SEED_UPDATE, goog.bind(this.onPrizeSeedUpdated_, this));
  this.protocol_.registerHandler(dotprod.Protocol.S2CPacketType.PRIZE_COLLECTED, goog.bind(this.onPrizeCollected_, this));
  this.protocol_.startGame(0 /* ship */);

  dotprod.Timer.setInterval(goog.bind(this.renderingLoop_, this), 1);
}