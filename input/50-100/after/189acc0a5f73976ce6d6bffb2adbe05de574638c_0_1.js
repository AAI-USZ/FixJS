function center(){
    if(!window.map || !window.map.map || !window.map.map.center)
        return [52.20531805547327, 0.10361167127326709];
    return [map.map.center.lat(), map.map.center.lng()];
}