function onCut() {

          if (!priv.isCellEdited) {

            setTimeout(function () {

              selection.empty();

            }, 100);

          }

        }