function isBetterLocation(newLocation, currentLocation){
	// the zero priority: a location is always better than nothing
	if (currentLocation == null){
		return true;
	}
	
	// calculate the time delta
	timeDelta = newLocation.timestamp - currentLocation.timestamp;
    isSignificantlyNewer = (timeDelta > TimeThreshold);
    isSignificantlyOlder = (timeDelta < -TimeThreshold);
    isNewer = (timeDelta > 0);
    
    // 1st thought: if the new location is significantly new/old? -> accept / discard
    if (isSignificantlyNewer) {
        return true;
    // If the new location is more than two minutes older, it must be worse
    } else if (isSignificantlyOlder) {
        return false;
    }
    
    // calculate the accuracy delta
    accuracyDelta = (newLocation.coords.accuracy - currentLocation.coords.accuracy);
    isLessAccurate = (accuracyDelta > 0);
    isMoreAccurate = (accuracyDelta < 0);
    isSignificantlyLessAccurate = (accuracyDelta > 50);
    
    // 2nd rule: choose a more accruate one if they are about the same age
    if (isMoreAccurate) {
    	return true;
    } else if(isNewer && !isSignificantlyLessAccurate){ // bottom line, indicates the user is actually moving but we can't get a accurate update like last time
    	return true;
    }
    
    return false; // we don't need that
}