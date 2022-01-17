function ensureFrame(frameNum) {
    var n = ptimeline.length;
    while (n < frameNum) {
      var frame = create(lastFrame);
      lastFrame = frame;
      var pframe = pframes[currentPframe++];
      if (!pframe)
        break;
      var currentFrame = n + 1;
      if (pframe.name)
        frameLabels[pframe.name.toLowerCase()] = currentFrame;
      var i = pframe.repeat || 1;
      while (i--) {
        ptimeline.push(frame);
        ++n;
      }

      function initCharacter(proto, entry, initObj, parent, as2Context) {
        var character;
        var matrix = entry.matrix || initObj.matrix || identityMatrix;
        var cxform = entry.cxform || initObj.cxform;
        var ratio = entry.ratio || 0;

        if (proto instanceof DisplayListItem)
          character = proto.character; // reusing created one
        else {
          // creates new instance of the character
          if (proto.constructor !== Object)
            character = proto.constructor(as2Context);
          else
            character = create(proto);

          character.matrix = matrix;
          character.cxform = cxform;
          if (character.draw)
            character.ratio = ratio;

          if (entry.events)
            character.events = entry.events;
          if (entry.name) {
            character.name = entry.name;
            parent.$addChild(entry.name, character);
          }
          character.parent = parent;
          character.root = parent.root || parent;
          if (character.variableName)
            parent.$bindVariable(character);
        }

        var item = new DisplayListItem(character);
        item.matrix = matrix;
        item.cxform = cxform;
        if (character.draw)
          item.ratio = ratio;

        return item;
      }

      function buildFromPrototype(proto, entry, obj, frame, depth, promise) {
        var objectCreator = (function objectCreator(parent, objectCache, asContext) {
          var character = initCharacter(objectCache.get(proto) || proto, entry,
                                        objectCache.get(obj) || obj, parent, asContext);
          objectCache.set(objectCreator, character);
          return character;
        });
        frame[depth] = objectCreator;
        if (promise)
          promise.resolve(objectCreator);
      }

      var framePromises = [lastFramePromise];

      var depths = keys(pframe), depth;
      while (depth = depths[0]) {
        if (+depth) {
          var entry = pframe[depth];
          if (entry) {
            var promise = null;
            var initObj = (entry.move ? frame[depth] : null) || {};
            var id = entry.id;
            if (id) {
              assert(id in dictionary, 'unknown object', 'place');
              var protoPromise = dictionary.getPromise(id);
              promise = new Promise();
              frame[depth] = promise;
              protoPromise.then((function(frame, depth, entry, initObj, promise, proto) {
                if (initObj instanceof Promise) {
                  initObj.then(function(obj) {
                    buildFromPrototype(proto, entry, obj, frame, depth, promise);
                  });
                } else {
                  buildFromPrototype(proto, entry, initObj, frame, depth, promise);
                }
              }).bind(null, frame, depth, entry, initObj, promise));
            } else {
              if (initObj instanceof Promise) {
                promise = new Promise();
                frame[depth] = promise;
                initObj.then((function(frame, depth, promise, obj) {
                  buildFromPrototype(obj, entry, obj, frame, depth, promise);
                }).bind(null, frame, depth, promise));
              } else {
                buildFromPrototype(initObj, entry, initObj, frame, depth, null);
              }
            }
            if (promise)
              framePromises.push(promise);
          } else {
            frame[depth] = null;
          }
        }
        depths.shift();
      }
      var framePromise = Promise.all(framePromises);
      lastFramePromise = framePromise;
      framePromise.then((function(pframe, frame, currentFrame, lastInserted) {
        function initialize(instance) {
          if (pframe.actionsData && pframe.actionsData.length > 0) {
            for (var i = 0; i < pframe.actionsData.length; i++)
              instance.$addFrameScript(currentFrame,
                instance.$createAS2Script(pframe.actionsData[i]));
          }

          if (pframe.initActionsData) {
            for (var spriteId in pframe.initActionsData) {
              instance.$createAS2Script(pframe.initActionsData[spriteId]).call(instance);
            }
          }
          if (pframe.assets) {
            instance.$addChild('soundmc', new SoundMock(pframe.assets));
          }
          if (currentFrame == 1)
            instance.$dispatchEvent('onLoad');
        }

        ptimelinePromises[framesLoaded].resolve(frame, ptimeline[framesLoaded - 1], initialize);
        framesLoaded++;
        while(framesLoaded < lastInserted) {
          ptimelinePromises[framesLoaded].resolve(null, frame);
          framesLoaded++;
        }
        loader.framesLoaded = framesLoaded;
      }).bind(null, pframe, frame, currentFrame, n));
    }
    if (n < totalFrames) {
      lastFramePromise.then(function() {
        prefetchFrame();
      });
    }
  }