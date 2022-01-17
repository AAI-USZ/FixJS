function getUrl(providerName) {
            switch (providerName) {
                case 'storm':
                    providerName = 'Storm';
                    break;
            }
            var jaydataScript = document.querySelector('script[src*="jaydata"]');
            if (jaydataScript) return jaydataScript.src.substring(0, jaydataScript.src.lastIndexOf('/') + 1) + providerName + 'Provider.js';
            else return 'providers/' + providerName + 'Provider.js';
        }