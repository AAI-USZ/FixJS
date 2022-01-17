function (t) {
                if (t.type === 'returns') {
                    if (!disp) {
                        html += '<h2>Returns</h2>';
                        disp = true;
                    }
                    html += '<p>';
                    if (fTags.type) {
                        html += '<b>(' + fTags.type[0].types.join(', ') + ')</b> ';
                    }
                    html += t.string + '</p>';

                }
            }