function(id, o, badcookie) {
                var time = (new Date()) - txTimes[id],
                    respData,
                    txId,
                    callback;

                try {
                    respData = Y.JSON.parse(o.responseText);
                    txId = respData.resps[0].txId,
                    callback = cbs[txId];
                } catch (e) {
                    respData = e.message;
                    txId = null;
                    callback = null;
                }

                delete cbs[txId];
                this.fire('transactionResponse', {
                    type: 'transactionResponse',
                    id: id,
                    resp: o,
                    responseData: respData,
                    badcookie: badcookie,
                    cb: callback,
                    time: time
                },
                    NAME);
                // Y.log('Request success received, stopping timer. Length: ' +
                //     time + 'ms', 'debug', NAME);
            }