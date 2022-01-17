function (event) {
            if (event.keyCode === '13' || event.keyCode === 13 || event.keyCode === '0' || event.keyCode === 0) { // enter or return
                if (omnibar.value.trim() !== "") {
                    if (_currentURL().match(/^file:/) && omnibar.value.match(/^file:/)) { // Use ajax to know whether that file exists
                        xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.responseText !== '') {
                                    _persist(omnibar.value);
                                    _persistRoot(omnibar.value);
                                    emulatorBridge.window().location.assign(omnibar.value);
                                } else {
                                    alert("File doesn't exist!");
                                    return;
                                }
                            }
                        };
                        xhr.open('GET', omnibar.value, true);
                        xhr.send(null);
                    } else {
                        //default the protocal if not provided
                        omnibar.value = omnibar.value.indexOf("://") < 0 ? "http://" + omnibar.value : omnibar.value;
                        _persist(omnibar.value);
                        _persistRoot(omnibar.value);
                        emulatorBridge.window().location.assign(omnibar.value);
                    }
                }
            }
        }