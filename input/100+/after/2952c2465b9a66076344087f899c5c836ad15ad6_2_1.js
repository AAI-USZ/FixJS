function (saveExternalData, template, ninjaWrapper, libCopyCallback) {
            //TODO: Improve reference for rootUrl
            var regexRootUrl,
                rootUrl = this.application.ninja.coreIoApi.rootUrl + escape((this.application.ninja.documentController.documentHackReference.root.split(this.application.ninja.coreIoApi.cloudData.root)[1])),
                mjsCreator = template.mjsTemplateCreator.create(),
                mJsSerialization,
                toremovetags = [],
                presentNodes,
                montageTemplate;
            //Creating instance of template creator
            montageTemplate = mjsCreator.initWithDocument(template.document);
            //Setting up expression for parsing URLs
            regexRootUrl = new RegExp(rootUrl.replace(/\//gi, '\\\/'), 'gi');
            //Injecting head and body into old document
            if (montageTemplate._ownerSerialization.length > 0) {
                template.file.content.document.head.innerHTML = montageTemplate._document.head.innerHTML.replace(regexRootUrl, '');
                template.file.content.document.body.innerHTML = montageTemplate._document.body.innerHTML.replace(regexRootUrl, '');
                //
                mJsSerialization = montageTemplate._ownerSerialization;
            } else {
                template.file.content.document.head.innerHTML = template.head.innerHTML.replace(regexRootUrl, '');
                template.file.content.document.body.innerHTML = template.body.innerHTML.replace(regexRootUrl, '');
            }
            //Removes all attributes from node
            function wipeAttributes (node) {
                for (var f in node.attributes) {
                    node.removeAttribute(node.attributes[f].name);
                }
            }
            //Copying attributes to maintain same properties as the <body>
            wipeAttributes(template.file.content.document.body);
            for (var n in template.body.attributes) {
                if (template.body.attributes[n].value) {
                    template.file.content.document.body.setAttribute(template.body.attributes[n].name, template.body.attributes[n].value);
                }
            }
            //
            if(template.template) {
                //
                // TODO - Need to handle banner and animation templates.
                //Copying attributes to maintain same properties as <ninja-content>
                var ninjaContentTagMem = template.document.getElementsByTagName('ninja-content')[0], ninjaContentTagDoc = template.file.content.document.getElementsByTagName('ninja-content')[0];
                if (ninjaContentTagMem && ninjaContentTagMem.getAttribute('data-ninja-style') !== null) {
                    ninjaContentTagDoc.setAttribute('style', ninjaContentTagMem.getAttribute('data-ninja-style'));
                    ninjaContentTagDoc.removeAttribute('data-ninja-style');
                } else if (ninjaContentTagMem && ninjaContentTagMem.getAttribute('data-ninja-style') === null) {
                    ninjaContentTagDoc.removeAttribute('style');
                    ninjaContentTagDoc.removeAttribute('data-ninja-style');
                }
                // TODO - clean up into single method
                ninjaContentTagMem = template.document.getElementsByTagName('ninja-viewport')[0], ninjaContentTagDoc = template.file.content.document.getElementsByTagName('ninja-viewport')[0];
                if (ninjaContentTagMem && ninjaContentTagMem.getAttribute('data-ninja-style') !== null) {
                    ninjaContentTagDoc.setAttribute('style', ninjaContentTagMem.getAttribute('data-ninja-style'));
                    ninjaContentTagDoc.removeAttribute('data-ninja-style');
                } else if (ninjaContentTagMem && ninjaContentTagMem.getAttribute('data-ninja-style') === null) {
                    ninjaContentTagDoc.removeAttribute('style');
                    ninjaContentTagDoc.removeAttribute('data-ninja-style');
                }
            } else {
                if (template.body && template.body.getAttribute('data-ninja-style') !== null) {
                    template.file.content.document.body.setAttribute('style', template.body.getAttribute('data-ninja-style'));
                    template.file.content.document.body.removeAttribute('data-ninja-style');
                } else if (template.body && template.body.getAttribute('data-ninja-style') === null) {
                    template.file.content.document.body.removeAttribute('style');
                    template.file.content.document.body.removeAttribute('data-ninja-style');
                }
            }

            wipeAttributes(template.file.content.document.head);
            //Copying attributes to maintain same properties as the <head>
            for (var m in template.document.head.attributes) {
                if (template.document.head.attributes[m].value) {
                    template.file.content.document.head.setAttribute(template.document.head.attributes[m].name, template.document.head.attributes[m].value);
                }
            }
            //Copying attributes to maintain same properties as the <html>
            var htmlTagMem = template.document.getElementsByTagName('html')[0], htmlTagDoc = template.file.content.document.getElementsByTagName('html')[0];
            wipeAttributes(htmlTagDoc);
            //
            for (var m in htmlTagMem.attributes) {
                if (htmlTagMem.attributes[m].value) {
                    if (htmlTagMem.attributes[m].value.replace(/montage-app-bootstrapping/gi, '').length>0) {
                        htmlTagDoc.setAttribute(htmlTagMem.attributes[m].name, htmlTagMem.attributes[m].value.replace(/ montage-app-bootstrapping/gi, ''));
                    }
                }
            }
            //
            if (htmlTagMem && htmlTagMem.getAttribute('data-ninja-style') !== null) {
                htmlTagDoc.setAttribute('style', htmlTagMem.getAttribute('data-ninja-style'));
                htmlTagDoc.removeAttribute('data-ninja-style');
            } else if (htmlTagMem && htmlTagMem.getAttribute('data-ninja-style') === null) {
                htmlTagDoc.removeAttribute('style');
                htmlTagDoc.removeAttribute('data-ninja-style');
            }
            //Getting list of current nodes (Ninja DOM)
            presentNodes = template.file.content.document.getElementsByTagName('*');
            //Looping through nodes to determine origin and removing if not inserted by Ninja
            for (var n in presentNodes) {
                //
                if (presentNodes[n].getAttribute && presentNodes[n].getAttribute('data-ninja-node') === null) {
                    toremovetags.push(presentNodes[n]);
                } else if (presentNodes[n].getAttribute && presentNodes[n].getAttribute('data-ninja-node') !== null) {
                    //Removing attribute
                    presentNodes[n].removeAttribute('data-ninja-node');
                }
            }
            //Getting all CSS (style or link) tags
            var styletags = template.file.content.document.getElementsByTagName('style'),
                linktags = template.file.content.document.getElementsByTagName('link'),
                njtemplatetags = template.file.content.document.querySelectorAll('[data-ninja-template]');

            //Adding to tags to be removed form template
            for (var f in njtemplatetags) {
                if (njtemplatetags[f].getAttribute) toremovetags.push(njtemplatetags[f]);
            }
            //Getting styles tags to be removed from document
            if (styletags.length) {
                for (var j = 0; j < styletags.length; j++) {
                    if (styletags[j].getAttribute) {
                        if (styletags[j].getAttribute('data-ninja-uri') !== null && !styletags[j].getAttribute('data-ninja-template')) {
                            toremovetags.push(styletags[j]);
                        } else if (styletags[j].getAttribute('data-ninja-external-url')) {
                            toremovetags.push(styletags[j]);
                        }
                    }
                }
            }
            //Removing styles tags from document
            for (var h = 0; toremovetags[h]; h++) {
                try {
                    //Checking head first
                    template.file.content.document.head.removeChild(toremovetags[h]);
                } catch (e) {

                }
                try {
                        //Checking body if not in head
                        template.file.content.document.body.removeChild(toremovetags[h]);
                    } catch (e) {
                        //Error, not found!
                    }
            }
            //Removing disabled tags from tags that were not originally disabled by user (Ninja enables all)
            for (var l in linktags) {
                if (linktags[l].getAttribute && linktags[l].getAttribute('disabled')) {//TODO: Use querySelectorAll
                    for (var p = 0; toremovetags[p]; p++) {
                        if (toremovetags[p].getAttribute('href') === linktags[l].getAttribute('href')) {
                            if (!toremovetags[p].getAttribute('data-ninja-disabled')) {
                                linktags[l].removeAttribute('disabled');
                            }
                        }
                    }
                }
            }













            //TODO: Make proper CSS method



            //Checking for type of save: styles = <style> only | css = <style> and <link> (all CSS)
            if (template.styles) {
                //Getting all style tags
                var styleCounter = 0,
                    docStyles = template.file.content.document.getElementsByTagName('style');
                //Looping through all style tags
                for (var i in template.styles) {
                    if (template.styles[i].ownerNode) {
                        if (template.styles[i].ownerNode.getAttribute) {
                            //Checking for node not to be loaded from file
                            if (template.styles[i].ownerNode.getAttribute('data-ninja-uri') === null && !template.styles[i].ownerNode.getAttribute('data-ninja-template') && !template.styles[i].ownerNode.getAttribute('data-ninja-external-url')) {
                                if (docStyles[styleCounter] && template.styles[i].ownerNode.getAttribute('data-ninja-node')) {
                                    //Inseting data from rules array into tag as string
                                    docStyles[styleCounter].innerHTML = this.getCssFromRules(template.styles[i].cssRules);
                                    //Syncing <style> tags count since it might be mixed with <link>
                                    styleCounter++;
                                }
                            }
                        }
                    }
                }
            } else if (template.css && saveExternalData) {
                //Getting all style and link tags
                var styleCounter = 0,
                    docStyles = template.file.content.document.getElementsByTagName('style'),
                    docLinks = template.file.content.document.getElementsByTagName('link');
                //Removing Ninja Data Attributes
                for (var n in docLinks) {
                    if (docLinks[n].attributes) {
                        for (var m in docLinks[n].attributes) {
                            if (docLinks[n].attributes[m].name && docLinks[n].attributes[m].name.indexOf('data-ninja') !== -1) {
                                docLinks[n].removeAttribute(docLinks[n].attributes[m].name);
                            }
                        }
                    }
                }
                //
                for (var i in template.css) {
                    if (template.css[i].ownerNode) {
                        if (template.css[i].ownerNode.getAttribute) {
                            if (template.css[i].ownerNode.getAttribute('data-ninja-uri') === null && !template.css[i].ownerNode.getAttribute('data-ninja-template')) {//TODO: Use querySelectorAll
                                //Inseting data from rules array into <style> as string
                                if (docStyles[styleCounter] && !template.css[i].ownerNode.getAttribute('data-ninja-external-url') && template.css[i].ownerNode.getAttribute('data-ninja-node')) {
                                    docStyles[styleCounter].innerHTML = this.getCssFromRules(template.css[i].cssRules);
                                    styleCounter++;
                                }
                            } else if (!template.css[i].ownerNode.getAttribute('data-ninja-template')) {
                                //Checking for attributes to be added to tag upon saving
                                for (var k in docLinks) {
                                    if (docLinks[k].getAttribute) {
                                        if (docLinks[k].getAttribute('href') && ('/' + docLinks[k].getAttribute('href')) === template.css[i].ownerNode.getAttribute('data-ninja-file-url')) {
                                            for (var l in template.css[i].ownerNode.attributes) {
                                                if (template.css[i].ownerNode.attributes[l].value) {
                                                    if (template.css[i].ownerNode.attributes[l].name.indexOf('data-ninja') != -1) {
                                                        //Ninja attribute...
                                                    } else {
                                                        docLinks[k].setAttribute(template.css[i].ownerNode.attributes[l].name, template.css[i].ownerNode.attributes[l].value);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                ///////////////////////////////////////////////////////////////////////////////////////////
                                ///////////////////////////////////////////////////////////////////////////////////////////


                                var cleanedCss,
                                    dirtyCss = this.getCssFromRules(template.css[i].cssRules),
                                    fileUrl = template.css[i].ownerNode.getAttribute('data-ninja-file-url'),
                                    fileRootUrl = this.application.ninja.coreIoApi.rootUrl + fileUrl.split(fileUrl.split('/')[fileUrl.split('/').length - 1])[0],
                                    cleanedCss = dirtyCss.replace(/(\b(?:(?:https?|ftp|file|[A-Za-z]+):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$]))/gi, parseNinjaUrl.bind(this));

                                function parseNinjaUrl(url) {
                                    if (url.indexOf(this.application.ninja.coreIoApi.rootUrl) !== -1) {
                                        return this.getUrlfromNinjaUrl(url, fileRootUrl, fileUrl);
                                    } else {
                                        return url;
                                    }
                                }

                                ///////////////////////////////////////////////////////////////////////////////////////////
                                ///////////////////////////////////////////////////////////////////////////////////////////




                                //Saving data from rules array converted to string into <link> file
                                var save = this.application.ninja.ioMediator.fio.saveFile({ uri: template.css[i].ownerNode.getAttribute('data-ninja-uri'), contents: cleanedCss });
                                //TODO: Add error handling for saving files
                            }
                        }
                    }
                }
            }


















            //
            var webgltag, webgllibtag, webglrdgetag, mjstag, mjslibtag, matchingtags = [],
                scripts = template.file.content.document.getElementsByTagName('script'),
                libsobserver = {montage: false, canvas: false, montageCopied: null, canvasCopied: null, callback: libCopyCallback, dispatched: false};
            //TODO: Clean up, this is messy
            if (mJsSerialization) libsobserver.montage = true;
            if (template.webgl && template.webgl.length > 1) libsobserver.canvas = true;
            //
            for (var i in scripts) {
                if (scripts[i].getAttribute) {
                    if (scripts[i].getAttribute('data-ninja-canvas') !== null) {//TODO: Use querySelectorAll
                        matchingtags.push(scripts[i]);
                    }
                    if (scripts[i].getAttribute('data-ninja-canvas-lib') !== null) {
                        webgllibtag = scripts[i]; // TODO: Add logic to delete unneccesary tags
                    }
                    if (scripts[i].getAttribute('data-ninja-canvas-rdge') !== null) {
                        webglrdgetag = scripts[i]; // TODO: Add logic to delete unneccesary tags
                    }
                    if (scripts[i].getAttribute('type') === 'text/montage-serialization') {
                        mjstag = scripts[i]; // TODO: Add logic to delete unneccesary tags
                    }
                    if (scripts[i].getAttribute('data-mjs-lib') !== null) {
                        mjslibtag = scripts[i]; // TODO: Add logic to delete unneccesary tags
                    }
                }
            }




            //TODO: Make proper webGL/Canvas method


            //Checking for webGL elements in document
            if (template.webgl && template.webgl.length > 1) {//TODO: Should be length 0, hack for a temp fix
                var rdgeDirName, rdgeVersion, cvsDataDir = this.getCanvasDirectory(template.file.root), fileCvsDir, fileCvsDirAppend, cvsDirCounter = 1, fileOrgDataSrc;
                //
                if (cvsDataDir && !matchingtags.length && !webgllibtag) {

                    if (template.libs.canvasId) {
                        libsobserver.canvasId = template.libs.canvasId;
                    } else {
                        libsobserver.canvasId = ClassUuid.generate();
                    }

                    //Creating data directory, will include materials at a later time
                    fileCvsDir = cvsDataDir+template.file.name.split('.'+template.file.extension)[0]+'_'+libsobserver.canvasId;

                    if (!this._getUserDirectory(fileCvsDir)) {
                        //TODO: create proper logic not to overwrite files
                        console.log('error');
                    }

                    fileCvsDir += '/';
                } else if (webgllibtag && webgllibtag.getAttribute && webgllibtag.getAttribute('data-ninja-canvas-json') !== null) {
                    fileOrgDataSrc = template.file.root+webgllibtag.getAttribute('data-ninja-canvas-json');
                }
                //Copy webGL library if needed
                for (var i in this.application.ninja.coreIoApi.ninjaLibrary.libs) {
                    //Checking for RDGE library to be available
                    if (this.application.ninja.coreIoApi.ninjaLibrary.libs[i].name === 'RDGE' && saveExternalData) {
                        rdgeDirName = (this.application.ninja.coreIoApi.ninjaLibrary.libs[i].name + this.application.ninja.coreIoApi.ninjaLibrary.libs[i].version).toLowerCase();
                        rdgeVersion = this.application.ninja.coreIoApi.ninjaLibrary.libs[i].version;
                        this.application.ninja.coreIoApi.ninjaLibrary.copyLibToCloud(template.file.root, rdgeDirName, function(result) {libsobserver.canvasCopied = result; this.libCopied(libsobserver);}.bind(this));
                    } else {
                        //TODO: Error handle no available library to copy
                    }
                }
                //
                if (matchingtags.length) {
                    if (matchingtags.length === 1) {
                        webgltag = matchingtags[0];
                    } else {
                        //TODO: Add logic to handle multiple tags, perhaps combine to one
                        webgltag = matchingtags[matchingtags.length - 1]; //Saving all data to last one...
                    }
                }
                //TODO: Add check for file needed
                if (!webglrdgetag) {
                    webglrdgetag = template.file.content.document.createElement('script');
                    webglrdgetag.setAttribute('type', 'text/javascript');
                    webglrdgetag.setAttribute('src', rdgeDirName + '/rdge-compiled.js');
                    webglrdgetag.setAttribute('data-ninja-canvas-rdge', 'true');
                    if (ninjaWrapper) {
                        template.file.content.document.body.getElementsByTagName('ninja-content')[0].appendChild(webglrdgetag);
                    } else {
                        template.file.content.document.head.appendChild(webglrdgetag);
                    }
                }
                //
                if (!webgllibtag) {
                    webgllibtag = template.file.content.document.createElement('script');
                    webgllibtag.setAttribute('type', 'text/javascript');
                    webgllibtag.setAttribute('src', rdgeDirName + '/canvas-runtime.js');
                    webgllibtag.setAttribute('data-ninja-canvas-lib', 'true');
                    if (ninjaWrapper) {
                        template.file.content.document.body.getElementsByTagName('ninja-content')[0].appendChild(webgllibtag);
                    } else {
                        template.file.content.document.head.appendChild(webgllibtag);
                    }
                }
                //
                if (!webgltag && !fileCvsDir && !fileOrgDataSrc) {
                    webgltag = template.file.content.document.createElement('script');
                    webgltag.setAttribute('data-ninja-canvas', 'true');
                    if (ninjaWrapper) {
                        template.file.content.document.body.getElementsByTagName('ninja-content')[0].appendChild(webgltag);
                    } else {
                        template.file.content.document.head.appendChild(webgltag);
                    }
                }

                //TODO: Decide if this should be over-writter or only written on creation
                var rootElement = 'document.body'; //TODO: Set actual root element

                //TODO: This data should be saved to a JSON file eventually
                var json = '\n({\n\t"version": "' + rdgeVersion + '",\n\t"directory": "' + rdgeDirName + '/",\n\t"data": [';
                //Looping through data to create escaped array
                for (var j = 0; template.webgl[j]; j++) {
                    if (j === 0) {
                        json += '\n\t\t\t"' + escape(template.webgl[j]) + '"';
                    } else {
                        json += ',\n\t\t\t"' + escape(template.webgl[j]) + '"';
                    }
                }
                //Closing array (make-shift JSON string to validate data in <script> tag)
                json += '\n\t\t]\n})\n';
                //Setting string in tag
                if (fileCvsDir || fileOrgDataSrc) {
                    //
                    var cvsDataFilePath, cvsDataFileUrl, cvsDataFileCheck, cvsDataFileOperation;
                    //
                    if (fileOrgDataSrc) {
                        cvsDataFilePath = fileOrgDataSrc;
                    } else {
                        cvsDataFilePath = fileCvsDir+'data.json';
                    }
                    //
                    cvsDataFileUrl = this.getNinjaPropUrlRedirect(cvsDataFilePath.split(this.application.ninja.coreIoApi.cloudData.root+'/')[1]),
                    cvsDataFileCheck = this.application.ninja.coreIoApi.fileExists({uri: cvsDataFilePath}),
                    //Setting the local path to the JSON file
                    webgllibtag.setAttribute('data-ninja-canvas-json', this.application.ninja.coreIoApi.rootUrl+'/'+cvsDataFileUrl);
                    webgllibtag.setAttribute('data-ninja-canvas-libpath', rdgeDirName);
                    //
                    if (saveExternalData && (cvsDataFileCheck.status === 404 || cvsDataFileCheck.status === 204)) {
                        //Saving file
                        cvsDataFileOperation = this.application.ninja.ioMediator.fio.saveFile({uri: cvsDataFilePath, contents: json});
                    } else {
                        //Error
                    }


                } else {
                    webgllibtag.setAttribute('data-ninja-canvas-libpath', rdgeDirName);
                    webgltag.innerHTML = json;
                }
            }














            //TODO: Make proper Montage method
            var mjsDirName, mjsVersion;
            //Checking for Montage
            if (mJsSerialization) {
                //Copy Montage library if needed
                for (var i in this.application.ninja.coreIoApi.ninjaLibrary.libs) {
                    //Checking for Montage library to be available
                    if (this.application.ninja.coreIoApi.ninjaLibrary.libs[i].name === 'Montage' && saveExternalData) {
                        mjsDirName = (this.application.ninja.coreIoApi.ninjaLibrary.libs[i].name + this.application.ninja.coreIoApi.ninjaLibrary.libs[i].version).toLowerCase();
                        mjsVersion = this.application.ninja.coreIoApi.ninjaLibrary.libs[i].version;
                        this.application.ninja.coreIoApi.ninjaLibrary.copyLibToCloud(template.file.root, mjsDirName, function(result) {libsobserver.montageCopied = result; this.libCopied(libsobserver);}.bind(this));



                        //TODO: Fix to allow no overwrite and nested locations
                        var mjsCheck, mjsPath = template.file.root + 'package.json';
                        mjsCheck = this.application.ninja.coreIoApi.fileExists({uri: mjsPath});
                        //
                        if (!mjsCheck || mjsCheck.status !== 204) {
                            var packjson = this.application.ninja.coreIoApi.createFile({ uri: mjsPath, contents: '{"mappings": {\n\t\t"montage": "' + mjsDirName + '/montage/",\n\t\t"montage-google": "' + mjsDirName + '/montage-google/"\n\t}\n}' });
                        } else {
                            //Already exists
                        }



                    } else {
                        //TODO: Error handle no available library to copy
                    }
                }
                //
                if (!mjslibtag) {
                    mjslibtag = template.file.content.document.createElement('script');
                    mjslibtag.setAttribute('type', 'text/javascript');
                    mjslibtag.setAttribute('src', mjsDirName + '/montage/montage.js');
                    mjslibtag.setAttribute('data-package', '.');
                    mjslibtag.setAttribute('data-mjs-lib', 'true');
                    if (ninjaWrapper) {
                        template.file.content.document.body.getElementsByTagName('ninja-content')[0].appendChild(mjslibtag);
                    } else {
                        template.file.content.document.head.appendChild(mjslibtag);
                    }

                }
                //
                if (!mjstag) {
                    mjstag = template.file.content.document.createElement('script');
                    mjstag.setAttribute('type', 'text/montage-serialization');
                    if (ninjaWrapper) {
                        template.file.content.document.body.getElementsByTagName('ninja-content')[0].appendChild(mjstag);
                    } else {
                        template.file.content.document.head.appendChild(mjstag);
                    }

                }
                //
                mjstag.innerHTML = mJsSerialization;
                mjsCreator = null;
            }













            //Cleaning URLs from HTML
            var cleanHTML;
            if (ninjaWrapper) {
                cleanHTML = template.file.content.document.body.innerHTML.replace(/(\b(?:(?:https?|ftp|file|[A-Za-z]+):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$]))/gi, parseNinjaRootUrl.bind(this));
            } else {
                cleanHTML = template.file.content.document.documentElement.outerHTML.replace(/(\b(?:(?:https?|ftp|file|[A-Za-z]+):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$]))/gi, parseNinjaRootUrl.bind(this));
            }
            //TODO: Remove, this is a temp hack to maintain a doc type on HTML files
            cleanHTML = '<!DOCTYPE html>'+cleanHTML;
            //
            function parseNinjaRootUrl(url) {
                if (url.indexOf(this.application.ninja.coreIoApi.rootUrl) !== -1) {
                    return this.getUrlfromNinjaUrl(url, rootUrl, rootUrl.replace(new RegExp((this.application.ninja.coreIoApi.rootUrl).replace(/\//gi, '\\\/'), 'gi'), '') + 'file.ext');
                } else {
                    return url;
                }
            }
            //
            if (ninjaWrapper) {
                cleanHTML = cleanHTML.replace(/ninja-viewport/gi, 'div');
                cleanHTML = cleanHTML.replace(/ninja-content/gi, 'div');
            }
            //
            if (libsobserver.montage || libsobserver.canvas) {
                return {content: this.getPrettyHtml(cleanHTML.replace(this.getAppTemplatesUrlRegEx(), '')), libs: true, montageId: libsobserver.montageId, canvasId: libsobserver.canvasId};
            } else {
                return {content: this.getPrettyHtml(cleanHTML.replace(this.getAppTemplatesUrlRegEx(), '')), libs: false, montageId: libsobserver.montageId, canvasId: libsobserver.canvasId};
            }
        }