function(queues) {
          var queue = queues[0]
            , block = queue.block
            , fn = renderer(view, reduceStack(queue.stack), queue.events)
          fn.unescaped = true;
          block.macroCtx[ctxName] = fn;
          if (sectionName) return;
          push(view, ns, stack, events, attrs, '', block);
        }