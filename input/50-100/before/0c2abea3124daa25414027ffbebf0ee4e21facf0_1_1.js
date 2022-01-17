function (t) {
                if (t.type === 'returns') {
                    if (!disp) {
                        html += '<h2>Returns</h2>';
                        disp = true;
                    }
                    html += '<p>' + t.string + '</p>';
                }
            }