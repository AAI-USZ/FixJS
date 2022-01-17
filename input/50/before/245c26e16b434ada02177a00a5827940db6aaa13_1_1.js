function () {
                if (event[stopPropagation])
                  event[stopPropagation]()
                else
                  event.cancelBubble = true
              }