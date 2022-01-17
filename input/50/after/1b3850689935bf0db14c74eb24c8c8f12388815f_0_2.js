function(router, event) {
          router.transitionTo('item', {item_id: event.context.id});
        }