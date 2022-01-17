function () {
                if (event[stopPropagation]) {
                  event[stopPropagation]()
                } else {
                  if (typeof event.cancelBubble !== 'unknown') { event.cancelBubble = true; }
                }
              }