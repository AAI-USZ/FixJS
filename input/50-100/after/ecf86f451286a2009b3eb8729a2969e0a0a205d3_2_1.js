function(object) {
          API.invalidate('productions');
          productions[object.uuid] = object;
          History.push('/production/' + object.uuid);
        }