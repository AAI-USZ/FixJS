function updateLocation( loc ) {
        var isChange = currentLocation != loc;

        // 存储当前信息
        // opera下，相同的hash重复写入会在历史堆栈中重复记录
        // 所以需要getLocation来判断
        if ( currentLocation != loc && getLocation() != loc ) {
            location.hash = loc;
        }

        currentLocation = loc;
        return isChange;
    }