function(i) {
          facebookContent.push([
            'div.option',
            ['input', {type: 'checkbox', name: $(this).attr('name'), id: $(this).attr('name'), checked: $(this).attr('checked') }],
            ['label', {for: $(this).attr('name')}, facebookLabels[i]]
          ])
        }