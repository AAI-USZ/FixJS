function mycallback(error, result, wasThrown)
        {
            callback((error || wasThrown) ? null : WebInspector.RemoteObject.fromPayload(result));
        }