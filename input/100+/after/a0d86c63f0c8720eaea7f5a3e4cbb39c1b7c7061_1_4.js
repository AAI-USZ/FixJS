function(entity) {
      entity = $.extend({}, window.game.entity_types[entity.type], entity);
      if ("init" in entity) {
        entity.init();
      }
      if (!'id' in entity) {
        entity.id = 'entity_' + (window.game.next_id++);
      }
      if ('image' in entity) {
        entity.bitmap = new Bitmap("/img/" + entity.image);
        entity.bitmap.regX = entity.bitmap.image.width * 0.5;
        entity.bitmap.regY = entity.bitmap.image.height * 0.5;
        window.game.stage.addChild(entity.bitmap);
      }
      window.game.entities.push(entity);
      window.game.entityIDs[entity.id] = entity;
      return window.physics.add_entity(entity);
    }