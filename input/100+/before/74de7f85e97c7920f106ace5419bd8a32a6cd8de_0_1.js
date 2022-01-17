function initialize(instance) {
          if (pframe.actionsData && pframe.actionsData.length > 0) {
            for (var i = 0; i < pframe.actionsData.length; i++)
              instance.$addFrameScript(currentFrame,
                instance.$createAS2Script(pframe.actionsData[i]));
          }

          if (pframe.initActionsData) {
            for (var spriteId in pframe.initActionsData) {
              if (!pframe.initActionsData.hasOwnProperty(spriteId))
                continue;
              instance.$createAS2Script(pframe.initActionsData[spriteId]).call(instance);
            }
          }
          if (pframe.assets) {
            instance.$addChild('soundmc', new SoundMock(pframe.assets));
          }
          if (currentFrame == 1)
            instance.$dispatchEvent('onLoad');
        }