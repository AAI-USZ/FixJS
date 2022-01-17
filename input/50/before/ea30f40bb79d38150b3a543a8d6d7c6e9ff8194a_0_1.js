function(inputdata) {
                return inputdata.
                    replace(/<ul id="menu">/g, '<ul id="menu" style="padding-left: 0px !important; margin-left: -200px !important;"><li style="background-color: red; font-size: 18pt; color: black;"><div style="padding: 8px 14px;">THIS IS A PROXY NOT THE REAL SOUP</div></li>');
            }