function(doc) {
        ArticleManager.initialDocument.meta = doc.meta;
        ArticleManager.initialDocument.children = doc.children;
        ArticleManager.initialDocument.requirements = doc.requirements;

        // Copy over the meta data inside the initial document
        initialDocumentMeta.forEach(function (meta) {
          var name = meta.getAttribute('name'),
              content = meta.getAttribute('content');

          if (name && content) {
            doc.meta[name] = content;
          }
        });

        doc.parent.replaceChild(ArticleManager.initialDocument, doc);
      }