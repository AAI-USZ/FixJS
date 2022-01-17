function () {
    var self = this;

    self.bucketNameCell = new StringHashFragmentCell("bucketName");
    self.documentsPageNumberCell = new StringHashFragmentCell("documentsPageNumber");
    self.documentIdCell = new StringHashFragmentCell("docId");
    self.lookupIdCell = new StringHashFragmentCell("lookupId");
    self.pageLimitCell = new StringHashFragmentCell("documentsPageLimit");

    var documents = $('#documents');
    var allDocsCont = $('#documents_list', documents);
    var allDocsTitle = $('.docs_title', allDocsCont);

    self.filter = new Filter({
      prefix: 'documents',
      hashName: 'documentsFilter',
      appendTo: allDocsTitle,
      onClose: function (param) {
        if (param.startkey || param.endkey) {
          self.lookupIdCell.setValue(undefined);
        }
      }
    }, {
      title: 'Documents Filter',
      prefix: 'documents',
      items: {
        descending: true,
        inclusiveEnd: true,
        endkeyDocid: true,
        startkeyDocid: true,
        endkey: true,
        startkey: true
      }
    }).init();

    createDocumentsCells(self, DAL.cells.mode, DAL.cells.capiBase, DAL.cells.bucketsListCell);

    var createDocDialog = $('#create_document_dialog');
    var createDocWarning = $('.warning', createDocDialog);
    var createDocInput = $('#new_doc_id', createDocDialog);
    var deleteDocDialog = $("#delete_document_confirmation_dialog");
    var deleteDocDialogWarning = $('.error', deleteDocDialog);

    var breadCrumpDoc = $('#bread_crump_doc', documents);
    var prevNextCont  = $('.ic_prev_next', documents);
    var prevBtn = $('.arr_prev', documents);
    var nextBtn = $('.arr_next', documents);
    var currenDocCont = $('#documents_details', documents);
    var allDocsEditingNotice = $('.documents_notice', allDocsCont);
    var editingNotice = $('.documents_notice', currenDocCont);
    var jsonDocId = $('.docs_title', currenDocCont);
    var docsLookup = $('#docs_lookup_doc_by_id', documents);
    var docsLookupBtn = $('#docs_lookup_doc_by_id_btn', documents);
    var docDeleteBtn = $('#doc_delete', documents);
    var docSaveAsBtn = $('#doc_saveas', documents);
    var docSaveBtn = $('#doc_save', documents);
    var docCreateBtn = $('.btn_create', documents);
    var docsBucketsSelect = $('#docs_buckets_select', documents);
    var lookupDocForm = $('#search_doc', documents);
    var docsInfoCont = $('.docs_info', documents);
    var docsTotalItemCont = $('.docs_total_item', documents);
    var docsCrntPgCont = $('.docs_crnt_pg', documents);
    var itemsPerListWrap = $('.items_per_list_wrap', documents);
    var itemsPerList = $('select', itemsPerListWrap);

    itemsPerList.selectBox();

    self.jsonCodeEditor = CodeMirror.fromTextArea($("#json_doc")[0], {
      lineNumbers: true,
      matchBrackets: false,
      tabSize: 2,
      mode: { name: "javascript", json: true },
      theme: 'default',
      readOnly: 'nocursor',
      onChange: function (doc) {
        enableSaveBtn(false);
        var history = doc.historySize();
        if (history.redo == 0 && history.undo == 0) {
          return;
        }
        enableSaveBtn(true);
        onDocValueUpdate(doc.getValue());
      }
    });

    var documentsDetails = $('#documents_details');
    var codeMirror = $(".CodeMirror", documentsDetails);

    _.each([prevBtn, nextBtn, docsLookupBtn, docDeleteBtn, docSaveAsBtn, docSaveBtn, docCreateBtn], function (btn) {
      btn.click(function (e) {
        if ($(this).hasClass('disabled')) {
          e.stopImmediatePropagation();
        }
      })
    });

    function showDocumentListState(page) {
      prevBtn.toggleClass('disabled', page.pageNumber === 0);
      nextBtn.toggleClass('disabled', isLastPage(page));

      docsTotalItemCont.text(page.isLookupList ? 'unknown' : page.docs.total_rows || 0);
      docsCrntPgCont.text(page.pageNumber + 1 + ' of ' + (page.isLookupList ? 'unknown' : Math.ceil(page.docs.total_rows / page.pageLimit) || 1 ) );

      var firstRow = page.docs.rows[0];
      if (firstRow && firstRow.key instanceof Object) {
        var error = new Error(firstRow.key.error);
        error.explanatoryMessage = '(' + firstRow.key.reason + ')';
        showDocumetsListErrorState(error);

        renderTemplate('documents_list', {
          loading: false,
          rows: [],
          pageNumber: page.pageNumber,
          bucketName: page.bucketName
        });
      } else {
        showDocumetsListErrorState(false);

        $.each(page.docs.rows, function (i) {
          removeSpecialKeys(page.docs.rows[i].doc, true);
        });

        renderTemplate('documents_list', {
          loading: false,
          rows: page.docs.rows,
          pageNumber: page.pageNumber,
          bucketName: page.bucketName
        });
      }
    }

    function showDocumetsListErrorState(error) {
      var message = error ? buildErrorMessage(error) : '';
      allDocsEditingNotice.text(message);
      allDocsEditingNotice.attr('title', JSON.stringify(message));
    }

    function isLastPage(page) {
      if (page.isLookupList) {
        return page.docs.rows.length <= page.pageLimit ? true : !page.docs.rows.pop();
      } else {
        return page.docs.rows.length < page.pageLimit ? true : (page.pageLimit * (page.pageNumber + 1)) >= page.docs.total_rows;
      }
    }

    function showCodeEditor(show) {
      self.jsonCodeEditor.setOption('readOnly', show ? false : 'nocursor');
      self.jsonCodeEditor.setOption('matchBrackets', show ? true : false);
      $(self.jsonCodeEditor.getWrapperElement())[show ? 'removeClass' : 'addClass']('read_only');
    }

    function showDocumentState(show) {
      showPrevNextCont(!show);
      showDocsInfoCont(!show);
      showItemsPerPage(!show);
      allDocsCont[show ? 'hide' : 'show']();
      currenDocCont[show ? 'show' : 'hide']();
      showCodeEditor(!show);
    }

    function bucketExistsState(exists) {
      enableLookup(exists);
      enableDeleteBtn(exists);
      if (exists === false) {
        showPrevNextCont(exists);
      }
    }

    function enableSaveBtn(enable) {
      docSaveBtn[enable ? 'removeClass' : 'addClass']('disabled');
    }

    function enableSaveAsBtn(enable) {
      docSaveAsBtn[enable ? 'removeClass' : 'addClass']('disabled');
    }

    function enableLookup(enable) {
      docsLookup.attr({disabled: !enable});
      docsLookupBtn[enable ? 'removeClass' : 'addClass']('disabled');
    }

    function enableDeleteBtn(enable) {
      docDeleteBtn[enable ? 'removeClass' : 'addClass']('disabled');
    }

    function showPrevNextCont(show) {
      prevNextCont[show ? 'show' : 'hide']();
    }

    function showItemsPerPage(show) {
      itemsPerListWrap[show ? 'show' : 'hide']();
    }

    function showDocsInfoCont(show) {
      docsInfoCont[show ? 'show' : 'hide']();
    }

    function tryShowJson(obj) {
      var isError = obj instanceof Error;

      if (!isError) {
        removeSpecialKeys(obj);
      } else {
        enableSaveBtn(false);
      }

      editingNotice.text(isError && obj ? buildErrorMessage(obj) : '');
      jsonDocId.text(isError ? '' : obj._id);
      self.jsonCodeEditor.setValue(isError ? '' : JSON.stringify(obj, null, "  "));
      enableDeleteBtn(!isError);
      enableSaveAsBtn(!isError);
      showCodeEditor(!isError);
    }

    function onDocValueUpdate(json) {
      enableSaveAsBtn(true);
      editingNotice.text('');
      try {
        var parsedJSON = JSON.parse(json);
      } catch (error) {
        enableSaveBtn(false);
        enableSaveAsBtn(false);
        enableDeleteBtn(true);
        error.explanatoryMessage = documentErrors.invalidJson;
        editingNotice.text(buildErrorMessage(error));
        return false;
      }
      return parsedJSON;
    }

    function buildErrorMessage(error) {
      return error.name + ': ' + error.message + ' ' + error.explanatoryMessage;
    }

    function removeSpecialKeys(json, underscore) {
      var i;
      for (i in json) {
        if (i.charAt(0) === '$') {
          delete json[i];
        }
        if (underscore) {
          if (i.charAt(0) === '_') {
            delete json[i];
          }
        }
      }
    }

    (function () {
      var page = {};
      var prevPage;
      var nextPage;

      Cell.subscribeMultipleValues(function (docs, currentPage, selectedBucket, pageLimit, filterParamsCell) {
        if (typeof currentPage === 'number') {
          prevPage = currentPage - 1;
          prevPage = prevPage < 0 ? 0 : prevPage;
          nextPage = currentPage + 1;
          page.pageLimit = pageLimit;
          page.pageNumber = currentPage;
          page.isLookupList = !!filterParamsCell.startkey || !!filterParamsCell.endkey;
        }
        if (docs) {
          page.docs = docs;
          page.bucketName = selectedBucket;
          showDocumentListState(page);
        } else {
          renderTemplate('documents_list', {loading: true});
          if (!!filterParamsCell.startkey || !!filterParamsCell.endkey) {
            // we don't know number of matches. that's why we can't allow user to quick clicks on next button
            nextBtn.toggleClass('disabled', true);
          }
        }
      },
        self.currentPageDocsCell, self.currentDocumentsPageNumberCell, self.selectedBucketCell,
        self.currentPageLimitCell, self.filter.filterParamsCell
      );

      nextBtn.click(function (e) {
        if (!page.isLookupList && isLastPage(page)) {
          return;
        }
        self.documentsPageNumberCell.setValue(nextPage);
      });

      prevBtn.click(function (e) {
        self.documentsPageNumberCell.setValue(prevPage);
      });
    })();

    self.lookupIdCell.subscribeValue(function (searchedDoc) {
      docsLookup.val(searchedDoc ? searchedDoc : '');
    });

    self.currentDocumentIdCell.subscribeValue(function (docId) {
      showDocumentState(!!docId);
    });

    self.pageLimitCell.getValue(function (value) {
      itemsPerList.selectBox('value', value);
    });

    self.currentDocCell.subscribeValue(function (doc) {
      if (!doc) {
        return;
      }
      tryShowJson(doc);
    });

    self.selectedBucketCell.subscribeValue(function (selectedBucket) {
      if (selectedBucket === undefined) {
        return;
      }
      bucketExistsState(!!selectedBucket);
    });

    lookupDocForm.submit(function (e) {
      e.preventDefault();
      var docsLookupVal = $.trim(docsLookup.val());
      if (docsLookupVal) {
        self.documentIdCell.setValue(docsLookupVal);
      }
    });

    breadCrumpDoc.click(function (e) {
      e.preventDefault();
      self.documentIdCell.setValue(undefined);
      self.lookupIdCell.setValue(undefined);
      self.filter.rawFilterParamsCell.setValue(undefined);
    });

    itemsPerList.change(function (e) {
      self.pageLimitCell.setValue(Number($(this).val()));
      self.documentsPageNumberCell.setValue(0);
    });

    docsBucketsSelect.bindListCell(self.populateBucketsDropboxCell, {
      onChange: function (e, newValue) {
        self.bucketNameCell.setValue(newValue);
        self.documentsPageNumberCell.setValue(undefined);
        self.documentIdCell.setValue(undefined);
      },
      onRenderDone: function (input, args) {
        if (args.list.length == 0) {
          input.val(documentErrors.bucketListEmpty);
        }
        if (args.selected === null) {
          input.val(documentErrors.bucketNotExist);
          input.css('color', '#C00');
        }
      }
    });

    (function(){
      var latestSearch;
      var currentFilterParams;

      Cell.subscribeMultipleValues(function (term, filterParams) {
        latestSearch = term;
        currentFilterParams = filterParams;
      }, self.lookupIdCell, self.filter.filterParamsCell);

      docsLookup.keyup(function (e) {
        var docsLookupVal = $.trim($(this).val());
        if (latestSearch === docsLookupVal) {
          return true;
        }
        if (!docsLookupVal) {
          delete currentFilterParams.startkey;
          delete currentFilterParams.endkey;
          self.lookupIdCell.setValue(undefined);
        } else {
          self.lookupIdCell.setValue(docsLookupVal);
          var start = JSON.stringify(docsLookupVal);
          var end = JSON.stringify(docsLookupVal + String.fromCharCode(0xffff));
          if (currentFilterParams.descending && currentFilterParams.descending === 'true') {  
            currentFilterParams.startkey = end;
            currentFilterParams.endkey = start;
          } else {
            currentFilterParams.startkey = start;
            currentFilterParams.endkey = end;
          }
        }
        self.filter.rawFilterParamsCell.setValue($.isEmptyObject(currentFilterParams) ? undefined : $.param(currentFilterParams, true));
        self.documentsPageNumberCell.setValue(0);
      });
    })();

    //CRUD
    (function () {
      var modal;
      var spinner;
      var dbURL;
      var currentDocUrl;

      self.dbURLCell.subscribeValue(function (url) {;
        dbURL = url;
      });

      self.currentDocURLCell.subscribeValue(function (url) {
        currentDocUrl = url;
      });

      function startSpinner(dialog) {
        modal = new ModalAction();
        spinner = overlayWithSpinner(dialog);
      }

      function stopSpinner() {
        modal.finish();
        spinner.remove();
      }

      function checkOnExistence(newUrl, preDefDoc) {
        couchReq("GET", newUrl, null,
          function (doc) {
            if (doc) {
              createDocWarning.text(documentErrors.alreadyExists).show();
            }
          },
          function (error) {
            startSpinner(createDocDialog);
            couchReq("PUT", newUrl, preDefDoc, function () {
              stopSpinner();
              hideDialog(createDocDialog);
              self.documentIdCell.setValue(preDefDoc._id);
            }, function (error, num, unexpected) {
              if (error.reason) {
                stopSpinner();
                createDocWarning.text(error.reason).show();
              } else {
                unexpected();
              }
              self.currentPageDocsURLCell.recalculate();
            });
          }
        );
      }

      docCreateBtn.click(function (e) {
        e.preventDefault();
        createDocWarning.text('');

        showDialog(createDocDialog, {
          eventBindings: [['.save_button', 'click', function (e) {
            e.preventDefault();
            var val = $.trim(createDocInput.val());
            if (val) {
              var preDefinedDoc = {_id: val};
              var newDocUrl = buildDocURL(dbURL, val);
              checkOnExistence(newDocUrl, preDefinedDoc);
            } else {
              createDocWarning.text(documentErrors.idEmpty).show();
            }
          }]]
        });
      });

      docSaveAsBtn.click(function (e) {
        e.preventDefault();
        createDocWarning.text('');

        showDialog(createDocDialog, {
          eventBindings: [['.save_button', 'click', function (e) {
            e.preventDefault();
            var json = onDocValueUpdate(self.jsonCodeEditor.getValue());
            if (json) {
              var val = $.trim(createDocInput.val());
              if (val) {
                var preDefinedDoc = json;
                preDefinedDoc._id = val;
                var newDocUrl = buildDocURL(dbURL, val);
                checkOnExistence(newDocUrl, preDefinedDoc);
              } else {
                createDocWarning.text(documentErrors.idEmpty).show();
              }
            } else {
              hideDialog(createDocDialog);
            }
          }]]
        });
      });

      docSaveBtn.click(function (e) {
        e.preventDefault();
        editingNotice.text('');
        var json = onDocValueUpdate(self.jsonCodeEditor.getValue());
        if (json) {
          startSpinner(codeMirror);
          enableSaveBtn(false);
          enableSaveAsBtn(false);
          enableDeleteBtn(false);
          couchReq('PUT', currentDocUrl, json, function () {
            couchReq("GET", currentDocUrl, undefined, function (doc) {
              removeSpecialKeys(doc);
              self.jsonCodeEditor.setValue(JSON.stringify(doc, null, "  "));
              stopSpinner();
              enableDeleteBtn(true);
              enableSaveAsBtn(true);
            });
          }, function (error, num, unexpected) {
            if (error.reason) {
              stopSpinner();
              editingNotice.text(error.reason).show();
            } else {
              unexpected();
            }
          });
        }
      });

      docDeleteBtn.click(function (e) {
        e.preventDefault();
        deleteDocDialogWarning.text('').hide();
        showDialog(deleteDocDialog, {
          eventBindings: [['.save_button', 'click', function (e) {
            e.preventDefault();
            startSpinner(deleteDocDialog);
            //deletion of non json document leads to 409 error
            couchReq('DELETE', currentDocUrl, null, function () {
              stopSpinner();
               hideDialog(deleteDocDialog);
              self.documentIdCell.setValue(undefined);
              self.currentPageDocsCell.recalculate();
            }, function (error, num, unexpected) {
              if (error.reason) {
                stopSpinner();
                deleteDocDialogWarning.text(error.reason).show();
              } else {
                unexpected();
              }
            });
          }]]
        });
      });
    })();
  }