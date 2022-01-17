function () {

  'use strict';

  /**
   * ===================================================================
   * Scope constants
   * ===================================================================
   */

  var MOCK_SOCKET = {
    disconnect:function () {
      log.debug("MOCK_SOCKET.disconnect() called");
    },
    on:function () {
      log.debug("MOCK_SOCKET.on() called");
    }
  };

  var IO_SCOPED_OPTS = {
    // reenables connection to get scoped events after leaving room and
    // then joining again
    'force new connection':true,
    // prevents disconnecting from NPS when app leave protection activates
    'sync disconnect on unload':false
  };

  var IO_GLOBAL_OPTS = {
    // prevents disconnecting from NPS when app leave protection activates
    'sync disconnect on unload':false
  };

  /**
   * ===================================================================
   * Scope variables
   * ===================================================================
   */

  /**
   * Global socket - for listening on global events (e.g. room created)
   */
  var socket = MOCK_SOCKET;

  var msgListener;

  /**
   * ===================================================================
   * Public API
   * ===================================================================
   */

  function setMsgListener(l) {
    log.debug("Setting client listener");
    msgListener = l;
  }

  function connect(url) {
    log.debug('Subscribing on global dispatcher with url: ' + url);
    if (window['io'] === undefined) {
      // this means that we failed to load socket.io.js from NPS instance
      log.error("Socket IO undefined");
      return;
    }
    socket = io.connect(url + '/global', IO_GLOBAL_OPTS);
    socket.on('connect', function () {
      log.debug("Successfully connected");
    });
    socket.on('newClient', _onNewClient);
    socket.on('clientLeft', _onClientLeft);
    socket.on('answer', _onAnswer);
    socket.on('offer', _onOffer);
    socket.on('reconnect_failed', function () {
      log.error("Failed to reconnect to NPS");
    });
    socket.on('connect_failed', function () {
      // this error means that socket.io.js was retrieved from NPS in < script > tag,
      // but failed to connect using available transports
      log.error("Connection to NPS failed");
    });
  }

  function joinScope(scopeId, clientId) {
    log.debug("Joining scope with id: " + scopeId);
    socket.emit('joinScope', {scopeId:scopeId, clientId:clientId});
  }

  function leaveScope(scopeId) {
    log.debug("Leaving scope with id: " + scopeId);
    socket.emit('leaveScope', scopeId);
  }

  function emitOffer(scopeId, targetClientId, offer) {
    socket.emit('offer', {
      scopeId:scopeId,
      targetClientId:targetClientId,
      offer:offer
    });
  }

  function emitAnswer(scopeId, targetClientId, answer) {
    socket.emit('answer', {
      scopeId:scopeId,
      targetClientId:targetClientId,
      answer:answer
    });
  }

  function _onNewClient(data) {
    msgListener.onNewClient(data);
  }

  function _onClientLeft(data) {
    msgListener.onClientLeft(data);
  }

  function _onOffer(data) {
    msgListener.onOffer(data.clientId, data.offer);
  }

  function _onAnswer(data) {
    msgListener.onAnswer(data.clientId, data.answer);
  }

  //noinspection UnnecessaryLocalVariableJS
  var publicAPI = {
    connect:connect,
    joinScope:joinScope,
    leaveScope:leaveScope,
    setMsgListener:setMsgListener,
    emitOffer:emitOffer,
    emitAnswer:emitAnswer
  };

  /**
   * ===================================================================
   * Private helpers, utilities
   * ===================================================================
   */


  return publicAPI;

}