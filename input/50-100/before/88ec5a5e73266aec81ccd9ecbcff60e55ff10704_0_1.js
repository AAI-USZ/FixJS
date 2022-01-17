function getUrl(providerName) {
            switch (providerName) {
                case 'storm':
                    providerName = 'Storm';
                    break;
            }
            return 'providers/' + providerName + 'Provider.js';
        }