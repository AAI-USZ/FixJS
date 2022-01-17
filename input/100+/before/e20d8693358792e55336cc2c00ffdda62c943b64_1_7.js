function(e) {
          return jQuery('.wortspiel-area', element).wordmatch({
            rootPrefix: 'lib/wordmatch/img/',
            result: function(res) {
              Capkom.profile.set({
                wordmatch: res
              });
              Capkom.clickNext();
              return jQuery('.wortspiel-area', element).wordmatch('destroy');
            },
            questions: [
              {
                type: 's2w',
                question: 'tree.jpg',
                choices: ['Baum', 'Haus', 'Hose'],
                correct: 'Baum'
              }, {
                type: 's2w',
                question: 'house.jpg',
                choices: ['Baum', 'Haus', 'Hose'],
                correct: 'Haus'
              }, {
                type: 's2w',
                question: 'pants.gif',
                choices: ['Baum', 'Haus', 'Hose'],
                correct: 'Hose'
              }, {
                type: 's2w',
                question: 'apfel.jpg',
                choices: ['Apfel', 'Hund', 'Erdbeere'],
                correct: 'Apfel'
              }, {
                type: 's2w',
                question: 'auto.jpg',
                choices: ['Hund', 'Erdbeere', 'Auto'],
                correct: 'Auto'
              }, {
                type: 's2w',
                question: 'ei.jpg',
                choices: ['Auto', 'Ei', 'Haus'],
                correct: 'Ei'
              }, {
                type: 's2w',
                question: 'rose.jpg',
                choices: ['Rose', 'Haus', 'Ei'],
                correct: 'Rose'
              }, {
                type: 's2w',
                question: 'erdbeere.jpg',
                choices: ['Katze', 'Erdbeere', 'Auto'],
                correct: 'Erdbeere'
              }, {
                type: 'w2s',
                question: 'Baum',
                choices: ['tree.jpg', 'pants.gif', 'house.jpg'],
                correct: 'tree.jpg'
              }, {
                type: 'w2s',
                question: 'Haus',
                choices: ['tree.jpg', 'pants.gif', 'house.jpg'],
                correct: 'house.jpg'
              }, {
                type: 'w2s',
                question: 'Hose',
                choices: ['tree.jpg', 'pants.gif', 'house.jpg'],
                correct: 'pants.gif'
              }, {
                type: 'w2s',
                question: 'Apfel',
                choices: ['cat.jpg', 'haus.jpg', 'apfel.jpg'],
                correct: 'apfel.jpg'
              }, {
                type: 'w2s',
                question: 'Auto',
                choices: ['tree.jpg', 'pants.gif', 'auto.jpg'],
                correct: 'auto.jpg'
              }, {
                type: 'w2s',
                question: 'Ei',
                choices: ['ei.jpg', 'haus.jpg', 'katze.jpg'],
                correct: 'ei.jpg'
              }, {
                type: 'w2s',
                question: 'Katze',
                choices: ['hund.jpg', 'katze.jpg', 'pants.gif'],
                correct: 'katze.jpg'
              }, {
                type: 'w2s',
                question: 'Schmetterling',
                choices: ['hund.jpg', 'schmetterling.jpg', 'tree.jpg'],
                correct: 'schmetterling.jpg'
              }
            ]
          });
        }