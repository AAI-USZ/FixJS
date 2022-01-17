function(object) {
          API.invalidate('productions');
          productions[object.uuid] = object;

          // Remove all objects except the current one
          // and /production
          var stack = View.getMain().getStack();
          var previous;
          while ((previous = stack.getPrevious())) {
            stack.remove(previous);
            if (stack.getLength() == 2)
              break;
          }

          History.push('/production/' + object.uuid);
        }