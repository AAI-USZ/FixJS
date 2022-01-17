function (k) {
              if (k === 'statusCode' ||
                  k === 'cookie' ||
                  k === 'set-cookie') return
              headers[k] = arg[k]
            }