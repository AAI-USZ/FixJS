function(feature) {
            var detail = [],
                attributes = feature.attributes;
            detail.push('<table class="detail">');
            for (var k in attributes) {
                if (attributes.hasOwnProperty(k) && attributes[k]) {
                    detail = detail.concat([
                        '<tr>',
                        '<th>',
                        OpenLayers.i18n(k),
                        '</th>',
                        '<td>',
                        attributes[k],
                        '</td>',
                        '</tr>'
                    ]);
                }
            }
            detail.push('</table>');
            feature.attributes.detail = detail.join('');
            feature.attributes.type = OpenLayers.i18n(feature.type); 

            if (feature.type != previousLayer) {
                previousLayer = feature.type;
                i = 0;
            }

            if (this.layers[feature.type] &&
                this.layers[feature.type].identifierAttribute) {
                // use the identifierAttribute field if set
                var identifier = this.layers[feature.type].identifierAttribute;
                feature.attributes.id = feature.attributes[identifier];
            } else {
                feature.attributes.id = feature.attributes.type + ' ' + ++i;
            }
        }