function mycallback(error, result, wasThrown)
        {
            if (!callback)
                return;

            callback((error || wasThrown) ? null : WebInspector.RemoteObject.fromPayload(result));
        }