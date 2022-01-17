function(opts) {
    if (!opts) {
        opts = {};
    }
    this.supportsBinary = (typeof Int8Array === 'function');
    // dlog('supports binary: ' + this.supportsBinary);

    var thisB = this;
    // Cache away the default sources before anything else

    this.defaultSources = [];
    for (var i = 0; i < this.sources.length; ++i) {
        this.defaultSources.push(this.sources[i]);
    }
    this.defaultChr = this.chr;
    this.defaultStart = this.viewStart;
    this.defaultEnd = this.viewEnd;

    this.icons = new IconSet(this.iconsURI);

    var overrideSources;
    var reset = false;
    var qChr = null, qMin = null, qMax = null;
    
    //
    // Configuration processing
    //

    var queryDict = {};
    if (location.search) {
        var query = location.search.substring(1);
        var queries = query.split(new RegExp('[&;]'));
        for (var qi = 0; qi < queries.length; ++qi) {
            var kv = queries[qi].split('=');
            var k = decodeURIComponent(kv[0]), v=null;
            if (kv.length > 1) {
                v = decodeURIComponent(kv[1]);
            }
            queryDict[k] = v;
        }
        
        reset = queryDict.reset;
    }

    var storedConfigVersion = localStorage['dalliance.' + this.cookieKey + '.version'];
    if (storedConfigVersion) {
        storedConfigVersion = storedConfigVersion|0;
    } else {
        storedConfigVersion = -100;
    }
    if (VERSION.CONFIG != storedConfigVersion) {
//        dlog("Don't understand config version " + storedConfigVersion + ", resetting.");
        reset = true;
    }

    var storedConfigHash = localStorage['dalliance.' + this.cookieKey + '.configHash'] || '';
    var pageConfigHash = hex_sha1(miniJSONify(this.sources));   // okay to switch this to "real" JSON?
    if (pageConfigHash != storedConfigHash) {
//        alert('page config seems to have changed, resetting');
        reset=true;
        localStorage['dalliance.' + this.cookieKey + '.configHash'] = pageConfigHash;
    }

    if (this.cookieKey && localStorage['dalliance.' + this.cookieKey + '.view-chr'] && !reset) {
        qChr = localStorage['dalliance.' + this.cookieKey + '.view-chr'];
        qMin = localStorage['dalliance.' + this.cookieKey + '.view-start']|0;
        qMax = localStorage['dalliance.' + this.cookieKey + '.view-end']|0;
    }

    if (this.cookieKey) {
	var maybeSourceConfig = localStorage['dalliance.' + this.cookieKey + '.sources'];
	if (maybeSourceConfig && !reset) {
	    overrideSources = JSON.parse(maybeSourceConfig);
	}
    }
    
    var region_exp = /([\d+,\w,\.,\_,\-]+):(\d+)[\-,\,](\d+)/;

    var queryRegion = false;
    if (queryDict.chr) {
	var qChr = queryDict.chr;
	var qMin = queryDict.min;
	var qMax = queryDict.max;
	queryRegion = true;
    }

    this.positionFeedback = queryDict.positionFeedback || false;
    guidelineConfig = queryDict.guidelines || 'foreground';
    if (guidelineConfig == 'true') {
	this.guidelineStyle = 'background';
    } else if (STRICT_NUM_REGEXP.test(guidelineConfig)) {
	this.guidelineStyle = 'background';
	this.guidelineSpacing = guidelineConfig|0;
    } else {
	this.guidelineStyle = guidelineConfig;
    }

    if (!queryRegion) {
	regstr = queryDict.r;
	if (!regstr) {
	    regstr = queryDict.segment || '';
	}
	var match = regstr.match(region_exp);
	if ((regstr != '') && match) {
	    qChr = match[1];
	    qMin = match[2] | 0;
	    qMax = match[3] | 0;
	}
	queryRegion = true;
    }
	
    if (qMax < qMin) {
	qMax = qMin + 10000;
    }

    var histr = queryDict.h || '';
    var match = histr.match(region_exp);
    if (match) {
	this.highlightMin = match[2]|0;
	this.highlightMax = match[3]|0;
    }

    //
    // Set up the UI (factor out?)
    //
           
    this.svgHolder = document.getElementById(this.pageName);
    this.svgRoot = makeElementNS(NS_SVG, 'svg', null, {
        version: '1.1',
        width: '860px',
        height: '500px',
        id: 'browser_svg'
    });
    removeChildren(this.svgHolder);
    this.svgHolder.appendChild(this.svgRoot);

    {
        var patdata = '';
         for (var i = -90; i <= 90; i += 20) {
             patdata = patdata + 'M ' + (Math.max(0, i) - 2) + ' ' + (Math.max(-i, 0) - 2) + ' L ' + (Math.min(100 + i, 100) + 2) + ' ' + (Math.min(100 - i, 100) + 2) + ' ';
             patdata = patdata + 'M ' + Math.max(i, 0) + ' ' + Math.min(i + 100, 100) + ' L ' + Math.min(i + 100, 100) + ' ' + Math.max(i, 0) + ' ';
        }
        var pat =  makeElementNS(NS_SVG, 'pattern',
                                 makeElementNS(NS_SVG, 'path', null, {
                                     stroke: 'lightgray',
                                     strokeWidth: 2,
                                     d: patdata
                                     // d: 'M 0 90 L 10 100 M 0 70 L 30 100 M 0 50 L 50 100 M 0 30 L 70 100 M 0 10 L 90 100 M 10 0 L 100 90 M 30 0 L 100 70 M 50 0 L 100 50 M 70 0 L 100 30 M 90 0 L 100 10'
                                     // 'M 0 90 L 90 0 M 0 70 L 70 0'
                                 }),
                                 {
                                     id: 'bgpattern-' + this.pageName,
                                     x: 0,
                                     y: 0,
                                     width: 100,
                                     height: 100
                                 });
        pat.setAttribute('patternUnits', 'userSpaceOnUse');
        this.svgRoot.appendChild(pat);
    }

    this.svgBackground = makeElementNS(NS_SVG, 'rect', null,  {id: 'background', fill: 'white' /*'url(#bgpattern-' + this.pageName + ')' */});
    var main = makeElementNS(NS_SVG, 'g', this.svgBackground, {
        fillOpacity: 1.0, 
        stroke: 'black', 
        strokeWidth: '0.1cm', 
        fontFamily: 'helvetica', 
        fontSize: '10pt'
    });
    this.svgRoot.appendChild(main);

    this.regionLabel = makeElementNS(NS_SVG, 'text', 'chr???', {
        x: 260,
        y: 30,
        strokeWidth: 0
    });
    main.appendChild(this.regionLabel);
    this.makeTooltip(this.regionLabel, 'Click to jump to a new location or gene');

    var addButton = this.icons.createButton('add-track', main, 30, 30);
    addButton.setAttribute('transform', 'translate(100, 10)');
    this.makeTooltip(addButton, 'Add tracks from the DAS registry');
    main.appendChild(addButton);

    var linkButton = this.icons.createButton('link', main, 30, 30);
    linkButton.setAttribute('transform', 'translate(140, 10)');
    this.makeTooltip(linkButton, 'Follow links to other genome browsers');
    main.appendChild(linkButton);

    var resetButton = this.icons.createButton('reset', main, 30, 30);
    resetButton.setAttribute('transform', 'translate(180, 10)');
    this.makeTooltip(resetButton, 'Reset the browser to a default state');
    main.appendChild(resetButton);

    var saveButton = this.icons.createButton('export', main, 30, 30);
    saveButton.setAttribute('transform', 'translate(220, 10)');
    this.makeTooltip(saveButton, 'Export the current genome display as a vector graphics file');
    main.appendChild(saveButton);
    var savePopupHandle;
    saveButton.addEventListener('mousedown', function(ev) {
        ev.stopPropagation();ev.preventDefault();
        var showing = savePopupHandle && savePopupHandle.displayed;
        thisB.removeAllPopups();
        
        if (showing) {
            return;
        }

        var saveDoc = document.implementation.createDocument(NS_SVG, 'svg', null);
        var saveWidth = thisB.svgRoot.getAttribute('width')|0;
        saveDoc.documentElement.setAttribute('width', saveWidth);
        saveDoc.documentElement.setAttribute('height', thisB.svgRoot.getAttribute('height'));

        var saveRoot = makeElementNS(NS_SVG, 'g', null, {
            fontFamily: 'helvetica'
        });
        saveDoc.documentElement.appendChild(saveRoot);
        var dallianceAnchor = makeElementNS(NS_SVG, 'text', 'Graphics from Dalliance ' + VERSION, {
                x: 80,
                y: 30,
                strokeWidth: 0,
                fill: 'black',
                fontSize: '12pt'
        });
        thisB.svgRoot.appendChild(dallianceAnchor);
        var daWidth = dallianceAnchor.getBBox().width;
        thisB.svgRoot.removeChild(dallianceAnchor);
        dallianceAnchor.setAttribute('x', saveWidth - daWidth - 60);
        saveRoot.appendChild(dallianceAnchor);
        // dallianceAnchor.setAttributeNS(NS_XLINK, 'xlink:href', 'http://www.biodalliance.org/');
        
        var chrLabel = thisB.chr;
        if (chrLabel.indexOf('chr') < 0) {
            chrLabel = 'chr' + chrLabel;
        }
        var fullLabel = chrLabel + ':' + (thisB.viewStart|0) + '..' + (thisB.viewEnd|0);
        saveRoot.appendChild(makeElementNS(NS_SVG, 'text', fullLabel, {
            x: 40,
            y: 30,
            strokeWidth: 0,
            fill: 'black',
            fontSize: '12pt'
        })); 

        saveRoot.appendChild(labelClip.cloneNode(true));
        saveRoot.appendChild(thisB.dasLabelHolder.cloneNode(true));
        saveRoot.appendChild(featureClip.cloneNode(true));
        saveRoot.appendChild(thisB.dasTierHolder.cloneNode(true));

        var svgButton = makeElement('input', null, {
            type: 'radio',
            name: 'format',
            value: 'svg',
            checked: true
        });
        var pdfButton = makeElement('input', null, {
            type: 'radio',
            name: 'format',
            value: 'pdf'
        });
        var saveForm = makeElement('form', [makeElement('p', "To work around restrictions on saving files from web applications, image export currently requires transmission of the browser's current state to a remote server.  Depending on connection speed, this can take a few seconds -- please be patient."),
                                            makeElement('p', 'The download links only work once, so if you wish to keep or share your exported images, please save a copy on your computer'),
                                            svgButton, 'SVG', makeElement('br'),
                                            pdfButton, 'PDF', makeElement('br'),
                                            makeElement('br'),
                                            makeElement('input', null, {type: 'hidden',  name: 'svgdata', value: new XMLSerializer().serializeToString(saveDoc)}),
                                            makeElement('input', null, {type: 'submit'})],
                                   {action: thisB.exportServer + 'browser-image.svg', method: 'POST'});
        svgButton.addEventListener('click', function(cev) {
            saveForm.setAttribute('action', thisB.exportServer + 'browser-image.svg');
        }, false);
        pdfButton.addEventListener('click', function(cev) {
            saveForm.setAttribute('action', thisB.exportServer + 'browser-image.pdf');
        }, false);
        saveForm.addEventListener('submit', function(sev) {
            setTimeout(function() {
                thisB.removeAllPopups();
            }, 200);
            return true;
        }, false);
        savePopupHandle = thisB.popit(ev, 'Export', saveForm, {width: 400});
    }, false);

    this.bin = this.icons.createIcon('bin', main);
    this.bin.setAttribute('transform', 'translate(10, 18)');
    main.appendChild(this.bin);
    this.makeTooltip(this.bin, 'Drag tracks here to discard');
    
    this.featureClipRect = makeElementNS(NS_SVG, 'rect', null, {
        x: this.tabMargin,
        y: 50,
        width: 850 - this.tabMargin,
        height: 440
    });
    var featureClip = makeElementNS(NS_SVG, 'clipPath', this.featureClipRect, {id: 'featureClip-' + this.pageName});
    main.appendChild(featureClip);
    this.labelClipRect = makeElementNS(NS_SVG, 'rect', null, {
        x: 10,
        y: 50,
        width: this.tabMargin - 10,
        height: 440
    });
    var labelClip = makeElementNS(NS_SVG, 'clipPath', this.labelClipRect, {id: 'labelClip-' + this.pageName});
    main.appendChild(labelClip);
    
    this.featureBackground = makeElementNS(NS_SVG, 'rect', null, {
        x: this.tabMargin,
        y: 50,
        width: 850 - this.tabMargin,
        height: 440,
        stroke: 'none',
        fill: 'url(#bgpattern-' + this.pageName + ')'
    });
    main.appendChild(this.featureBackground);

    this.dasTierHolder = makeElementNS(NS_SVG, 'g', null, {clipPath: 'url(#featureClip-' + this.pageName + ')'});   // FIXME needs a unique ID.
    main.appendChild(this.dasTierHolder);
    var dasTiers = makeElementNS(NS_SVG, 'g', null, {id: 'dasTiers'});
    this.dasTierHolder.appendChild(dasTiers);

    this.makeHighlight();
    
    this.dasLabelHolder = makeElementNS(NS_SVG, 'g', makeElementNS(NS_SVG, 'g', null, {id: 'dasLabels'}), {clipPath: 'url(#labelClip-' + this.pageName + ')'}); 
    main.appendChild(this.dasLabelHolder);
    
    {
        var plusIcon = this.icons.createIcon('magnifier-plus', main);
        var minusIcon = this.icons.createIcon('magnifier-minus', main);
        this.zoomTickMarks = makeElementNS(NS_SVG, 'g');
        this.zoomSlider = new DSlider(250);
        this.zoomSlider.onchange = function(zoomVal, released) {
	    thisB.zoom(Math.exp((1.0 * zoomVal) / thisB.zoomExpt));
	    if (released) {
                thisB.invalidateLayouts();
	        thisB.refresh();
	        thisB.storeStatus();
	    }
        };
        plusIcon.setAttribute('transform', 'translate(0,15)');
        plusIcon.setAttribute('pointer-events', 'all');
        plusIcon.addEventListener('mousedown', function(ev) {
            ev.stopPropagation();ev.preventDefault();

            var oz = thisB.zoomSlider.getValue();
            thisB.zoomSlider.setValue(oz - 10);
            var nz = thisB.zoomSlider.getValue();
            if (nz != oz) {
                thisB.zoom(Math.exp((1.0 * nz) / thisB.zoomExpt));
                thisB.scheduleRefresh(500);
            }
        }, false);
        this.zoomSlider.svg.setAttribute('transform', 'translate(30, 0)');
        minusIcon.setAttribute('transform', 'translate(285,15)');
        minusIcon.setAttribute('pointer-events', 'all');
        minusIcon.addEventListener('mousedown', function(ev) {
            ev.stopPropagation();ev.preventDefault();

            var oz = thisB.zoomSlider.getValue();
            thisB.zoomSlider.setValue(oz + 10);
            var nz = thisB.zoomSlider.getValue();
            if (nz != oz) {
                thisB.zoom(Math.exp((1.0 * nz) / thisB.zoomExpt));
                thisB.scheduleRefresh(500);
            }
        }, false);
        this.zoomWidget = makeElementNS(NS_SVG, 'g', [this.zoomTickMarks, plusIcon, this.zoomSlider.svg, minusIcon]);

        this.makeTooltip(this.zoomWidget, 'Drag to zoom');
        main.appendChild(this.zoomWidget);
    }

    this.karyo = new Karyoscape(this, this.karyoEndpoint);
    this.karyo.svg.setAttribute('transform', 'translate(480, 15)');
    this.karyo.onchange = function(pos) {
        var width = thisB.viewEnd - thisB.viewStart + 1;
        var newStart = ((pos * thisB.currentSeqMax) - (width/2))|0;
        var newEnd = newStart + width - 1;
        thisB.setLocation(newStart, newEnd);
    };
    main.appendChild(this.karyo.svg);
    
    this.popupHolder = makeElementNS(NS_SVG, 'g');
    main.appendChild(this.popupHolder);
    this.hPopupHolder = makeElement('div');
    this.hPopupHolder.style['font-family'] = 'helvetica';
    this.hPopupHolder.style['font-size'] = '12pt';
    this.svgHolder.appendChild(this.hPopupHolder);
  
    this.bhtmlRoot = makeElement('div');
    if (!this.disablePoweredBy) {
        this.bhtmlRoot.appendChild(makeElement('span', ['Powered by ', makeElement('a', 'Dalliance', {href: 'http://www.biodalliance.org/'}), ' ' + VERSION]));
    }
    this.svgHolder.appendChild(this.bhtmlRoot);
    
    if (this.guidelineStyle == 'foreground') {
	this.fgGuide = document.createElementNS(NS_SVG, 'line');
	this.fgGuide.setAttribute('x1', 500);
	this.fgGuide.setAttribute('y1', 50);
	this.fgGuide.setAttribute('x2', 500);
	this.fgGuide.setAttribute('y2', 10000);
	this.fgGuide.setAttribute('stroke', 'red');
	this.fgGuide.setAttribute('stroke-width', 1);
	this.fgGuide.setAttribute('pointer-events', 'none');
	main.appendChild(this.fgGuide);
    }
    
    // set up the linker

    var linkPopupHandle;
    linkButton.addEventListener('mousedown', function(ev) {
        var showing = linkPopupHandle && linkPopupHandle.displayed;
        ev.stopPropagation();ev.preventDefault();
	thisB.removeAllPopups();
        if (showing) {
            return;
        }

        var linkList = makeElement('ul');
        for (l in thisB.browserLinks) {
            linkList.appendChild(makeElement('li', makeElement('a', l, {
                href: thisB.browserLinks[l].replace(new RegExp('\\${([a-z]+)}', 'g'), function(s, p1) {
		    if (p1 == 'chr') {
		        return thisB.chr;
		    } else if (p1 == 'start') {
		        return thisB.viewStart|0;
		    } else if (p1 == 'end') {
		        return thisB.viewEnd|0;
		    } else {
		        return '';
		    }
	        }),
                target: '_new'
            })));
        }
        linkPopupHandle = thisB.popit(ev, 'Follow links to...', linkList);
    }, false);

    // set up the navigator

    var navPopupHandle;
    this.regionLabel.addEventListener('mousedown', function(ev) {
        ev.stopPropagation();ev.preventDefault();
        var showing = navPopupHandle && navPopupHandle.displayed;
	thisB.removeAllPopups(); 
        if (showing) {
            return;
        }

        if (thisB.entryPoints == null) {
            alert("entry_points aren't currently available for this genome");
            return;
        }
        var epMenuItems = [], epsByChrName = {};
        for (var epi = 0; epi < thisB.entryPoints.length; ++epi) {
            epMenuItems.push(new EPMenuItem(thisB.entryPoints[epi]));
        }
        
        
        epMenuItems = epMenuItems.sort(function(epmi0, epmi1) {
            var n0 = epmi0.nums;
            var n1 = epmi1.nums;
            var idx = 0;
            while (true) {
                if (idx >= n0.length) {
                    return -1;
                } else if (idx >= n1.length) {
                    return 1;
                } else {
                    var dif = n0[idx] - n1[idx];
                    if (dif != 0) {
                        return dif;
                    } 
                }
                ++idx;
            }
        });

        var popup = makeElement('div');
        popup.style.padding = '5px';
        popup.style.paddingRight = '9px';
       
        {
            var form = makeElement('form');
            
            form.appendChild(document.createTextNode('Location:'));
            var locWarning = makeElement('div', null, {}, {'color': 'red'});
            form.appendChild(locWarning);
            var locInput = (makeElement('input', null, {type: 'text', value: (thisB.chr + ':' + (thisB.viewStart|0) + '..' + (thisB.viewEnd|0))}));
            form.appendChild(locInput);
            form.appendChild(makeElement('br'));
            form.appendChild(makeElement('input', null, {type: 'submit', value: 'Go'}));
            popup.appendChild(form);
        }
        navPopupHandle = thisB.popit(ev, 'Jump to...', popup, {width: 300});

	form.addEventListener('submit', function(ev) {
	    ev.stopPropagation();ev.preventDefault();

            var locString = locInput.value.trim();
            var match = /^([A-Za-z0-9]+)[:\t ]([0-9]+)([-:.\t ]+([0-9]+))?$/.exec(locString);
            if (match && match.length == 5) {
                var nchr = match[1];
	        var nmin = stringToInt(match[2]);
                if (match[4]) {
	            var nmax = stringToInt(match[4]);
                } else {
                    var wid = thisB.viewEnd - thisB.viewStart + 1;
                    nmin = nmin - (wid/2)|0;
                    nmax = nmin + wid;
                }
	        
                if (nchr != thisB.chr) {
                    thisB.highlightMin = -1;
                    thisB.highlightMax = -1;
                }
                
                try {
		    thisB.setLocation(nmin, nmax, nchr);
                    thisB.removeAllPopups();
                } catch (msg) {
                    removeChildren(locWarning);
                    locWarning.appendChild(document.createTextNode(msg));
                }
            } else {
                removeChildren(locWarning);
                locWarning.appendChild(document.createTextNode('Should match chr:start...end or chr:midpoint'));
            }
	    return false;
	}, false);

        if (thisB.searchEndpoint) {
            var geneForm = makeElement('form');
            geneForm.appendChild(makeElement('p', 'Or search for...'))
            geneForm.appendChild(document.createTextNode('Gene:'));
            var geneInput = makeElement('input', null, {value: ''});
            geneForm.appendChild(geneInput);
            geneForm.appendChild(makeElement('br'));
            geneForm.appendChild(makeElement('input', null, {type: 'submit', value: 'Go'}));
            popup.appendChild(geneForm);
        
	
	    geneForm.addEventListener('submit', function(ev) {
	        ev.stopPropagation();ev.preventDefault();
	        var g = geneInput.value;
	        thisB.removeAllPopups();

	        if (!g || g.length == 0) {
		    return false;
	        }

	        thisB.searchEndpoint.features(null, {group: g, type: 'transcript'}, function(found) {        // HAXX
                    if (!found) found = [];
                    var min = 500000000, max = -100000000;
		    var nchr = null;
		    for (var fi = 0; fi < found.length; ++fi) {
			var f = found[fi];

                        if (f.label != g) {
                            // ...because Dazzle can return spurious overlapping features.
                            continue;
                        }

			if (nchr == null) {
			    nchr = f.segment;
			}
			min = Math.min(min, f.min);
			max = Math.max(max, f.max);
		    }

		    if (!nchr) {
		        alert("no match for '" + g + "' (NB. server support for search is currently rather limited...)");
		    } else {
		        thisB.highlightMin = min;
		        thisB.highlightMax = max;
		        thisB.makeHighlight();

		        var padding = Math.max(2500, (0.3 * (max - min + 1))|0);
		        thisB.setLocation(min - padding, max + padding, nchr);
		    }
	        }, false);
                
	        return false;
	    }, false);
        }

    }, false);

  
    var addPopupHandle;
    addButton.addEventListener('mousedown', function(ev) {
	ev.stopPropagation();ev.preventDefault();
        var showing = addPopupHandle && addPopupHandle.displayed;
	thisB.removeAllPopups();
        if (!showing) {
            addPopupHandle = thisB.showTrackAdder(ev);
        }
    }, false);

    // set up the resetter
    resetButton.addEventListener('mousedown', function(ev) {
        ev.stopPropagation();ev.preventDefault();

        removeChildren(thisB.tierHolder);
        removeChildren(thisB.dasLabelHolder);
        thisB.tiers = [];
        thisB.sources = [];
        thisB.knownSpace = null;

        for (var t = 0; t < thisB.defaultSources.length; ++t) {
	    var source = thisB.defaultSources[t];
            thisB.sources.push(source);
            thisB.makeTier(source);
        }
        thisB.arrangeTiers();
        thisB.highlightMin = thisB.highlightMax = -1;
        thisB.setLocation(thisB.defaultStart, thisB.defaultEnd, thisB.defaultChr);
    }, false);
	
    this.tierHolder = dasTiers;
    this.tiers = [];
    if (overrideSources) {
	this.sources = overrideSources;
    }
    for (var t = 0; t < this.sources.length; ++t) {
	var source = this.sources[t];
        if (source.bwgURI && !this.supportsBinary) {
            if (!this.binaryWarningGiven) {
                this.popit({clientX: 300, clientY: 100}, 'Warning', makeElement('p', 'your browser does not support binary data formats, some track(s) not loaded.  We currently recommend Google Chrome 9 or later, or Firefox 4 or later.'));
                this.binaryWarningGiven = true;
            }
            continue;
        }
        this.makeTier(source);
    }
    thisB.arrangeTiers();
    
    //
    // Window resize support (should happen before first fetch so we know the actual size of the viewed area).
    //

    this.resizeViewer(true);
    window.addEventListener('resize', function(ev) {
        thisB.resizeViewer();
    }, false);

    //
    // Finalize initial viewable region, and kick off a fetch.
    //

    if (qChr && qMin && qMax) {
        this.chr = qChr;this.viewStart = qMin;this.viewEnd = qMax;
	if (this.highlightMin < 0) {
	    this.highlightMin = qMin;this.highlightMax = qMax;
	}
    }
    
    if ((this.viewEnd - this.viewStart) > MAX_VIEW_SIZE) {
        var mid = ((this.viewEnd + this.viewStart) / 2)|0;
        this.viewStart = mid - (MAX_VIEW_SIZE/2);
        this.viewEnd = mid + (MAX_VIEW_SIZE/2) - 1;
    }

    this.origin = ((this.viewStart + this.viewEnd) / 2) | 0;
    this.scale = this.featurePanelWidth / (this.viewEnd - this.viewStart);

    this.zoomExpt = 250 / Math.log(MAX_VIEW_SIZE / this.zoomBase);
    this.zoomSlider.setValue(this.zoomExpt * Math.log((this.viewEnd - this.viewStart + 1) / this.zoomBase));

    this.move(0); // will trigger a refresh() after failing spaceCheck.

    //
    // Tick-marks on the zoomer
    //

    this.makeZoomerTicks();

    // 
    // Set up interactivity handlers
    //

    this.__mouseMoveHandler = function(ev) {
        return thisB.mouseMoveHandler(ev);
    }
    this.__mouseUpHandler = function(ev) {
        return thisB.mouseUpHandler(ev);
    }
    main.addEventListener('mousedown', function(ev) {return thisB.mouseDownHandler(ev)}, false);

/*
    main.addEventListener('touchstart', touchStartHandler, false);
    main.addEventListener('touchmove', touchMoveHandler, false);
    main.addEventListener('touchend', touchEndHandler, false);
    main.addEventListener('touchcancel', touchCancelHandler, false); */

    this.svgRoot.addEventListener('mousewheel', function(ev) {   // FIXME does this need to be on the document?
	if (!ev.wheelDeltaX) {
	    return;
	}

	ev.stopPropagation();ev.preventDefault();
	thisB.move(-ev.wheelDeltaX/5);
    }, false);
    this.svgRoot.addEventListener('MozMousePixelScroll', function(ev) {
	if (ev.axis == 1) {
	    ev.stopPropagation();ev.preventDefault();
	    if (ev.detail != 0) {
		thisB.move(ev.detail/4);
	    }
        }
    }, false);

    var keyHandler = function(ev) {
        // dlog('keycode=' + ev.keyCode + '; charCode=' + ev.charCode);
        if (ev.keyCode == 13) {
            var layoutsChanged = false;
            for (var ti = 0; ti < thisB.tiers.length; ++ti) {
                var t = thisB.tiers[ti];
                if (t.wantedLayoutHeight && t.wantedLayoutHeight != t.layoutHeight) {
                    t.layoutHeight = t.wantedLayoutHeight;
                    t.placard = null;
                    t.clipTier();
                    layoutsChanged = true;
                }
            }
            if (layoutsChanged) {
                thisB.arrangeTiers();
            }
        } else if (ev.keyCode == 32 || ev.charCode == 32) {
            if (!thisB.snapZoomLockout) {
                if (!thisB.isSnapZooming) {
                    thisB.isSnapZooming = true;
                    var newZoom = thisB.savedZoom || 1.0;
                    thisB.savedZoom = thisB.zoomSlider.getValue();
                    thisB.zoomSlider.setValue(newZoom);
                    thisB.zoom(Math.exp((1.0 * newZoom) / thisB.zoomExpt));
                    thisB.invalidateLayouts();
                    thisB.zoomSlider.setColor('red');
                    thisB.refresh();
                } else {
                    thisB.isSnapZooming = false;
                    var newZoom = thisB.savedZoom || 10.0;
                    thisB.savedZoom = thisB.zoomSlider.getValue();
                    thisB.zoomSlider.setValue(newZoom);
                    thisB.zoom(Math.exp((1.0 * newZoom) / thisB.zoomExpt));
                    thisB.invalidateLayouts();
                    thisB.zoomSlider.setColor('blue');
                    thisB.refresh();
                }
                thisB.snapZoomLockout = true;
            }
            ev.stopPropagation();ev.preventDefault();      
        } else if (ev.keyCode == 39) {
            ev.stopPropagation();ev.preventDefault();
            thisB.move(ev.shiftKey ? 100 : 25);
        } else if (ev.keyCode == 37) {
            ev.stopPropagation();ev.preventDefault();
            thisB.move(ev.shiftKey ? -100 : -25);
        } else if (ev.charCode == 61) {
            ev.stopPropagation();ev.preventDefault();

            var oz = thisB.zoomSlider.getValue();
            thisB.zoomSlider.setValue(oz - 10);
            var nz = thisB.zoomSlider.getValue();
            if (nz != oz) {
                thisB.zoom(Math.exp((1.0 * nz) / thisB.zoomExpt));
                thisB.scheduleRefresh(500);
            }
        } else if (ev.charCode == 45) {
            ev.stopPropagation();ev.preventDefault();

            var oz = thisB.zoomSlider.getValue();
            thisB.zoomSlider.setValue(oz + 10);
            var nz = thisB.zoomSlider.getValue();
            if (nz != oz) {
                thisB.zoom(Math.exp((1.0 * nz) / thisB.zoomExpt));
                thisB.scheduleRefresh(500);
            }
        } else if (ev.keyCode == 84) {
            var bumpStatus;
            for (var ti = 0; ti < thisB.tiers.length; ++ti) {
                var t = thisB.tiers[ti];
                if (t.dasSource.collapseSuperGroups) {
                    if (bumpStatus === undefined) {
                        bumpStatus = !t.bumped;
                    }
                    t.bumped = bumpStatus;
                    t.layoutWasDone = false;
                    t.draw();
                }
            }
        }
    };
    var keyUpHandler = function(ev) {

        thisB.snapZoomLockout = false;
/*
        if (ev.keyCode == 32) {
            if (thisB.isSnapZooming) {
                thisB.isSnapZooming = false;
                thisB.zoomSlider.setValue(thisB.savedZoom);
                thisB.zoom(Math.exp((1.0 * thisB.savedZoom / thisB.zoomExpt)));
                thisB.invalidateLayouts();
                thisB.refresh();
            }
            ev.stopPropagation(); ev.preventDefault();
        } */
    }

    var mouseLeaveHandler;
    mouseLeaveHandler = function(ev) {
        window.removeEventListener('keydown', keyHandler, false);
        window.removeEventListener('keyup', keyUpHandler, false);
        window.removeEventListener('keypress', keyHandler, false);
        thisB.svgRoot.removeEventListener('mouseout', mouseLeaveHandler, false);
    }

    this.svgRoot.addEventListener('mouseover', function(ev) {
        window.addEventListener('keydown', keyHandler, false);
        window.addEventListener('keyup', keyUpHandler, false);
        window.addEventListener('keypress', keyHandler, false);
        thisB.svgRoot.addEventListener('mouseout', mouseLeaveHandler, false);
    }, false);
    
    // Low-priority stuff
    this.storeStatus();   // to make sure things like resets are permanent.

    var epSource;
    for (var ti = 0; ti < this.tiers.length; ++ti) {
        var s = this.tiers[ti].dasSource;
        if (s.provides_entrypoints) {
            epSource = this.tiers[ti].dasSource;
            break;
        }
    }
    if (epSource) {
        epSource.entryPoints(
            function(ep) {
                thisB.entryPoints = ep;
                for (var epi = 0; epi < thisB.entryPoints.length; ++epi) {
                    if (thisB.entryPoints[epi].name == thisB.chr) {
                        thisB.currentSeqMax = thisB.entryPoints[epi].end;
                        break;
                    }
                }
            }
        );
    }

    thisB.queryRegistry(null, true);
    for (var m in this.chains) {
        this.queryRegistry(m, true);
    }
    
    //jw stuff for getting it to open at mgi accession
//          var query = window.location.search.substring(1);
//          
//    var params=query.split('=');
//    if(params.length>1){
//    var mgiAccession=params[1];
//    console.debug('mgiAccession='+mgiAccession);
// 
// var chromosome='10';
// var start=20000000;
// var stop=20030000;
//        
//         $(function() {
// $.ajax({
//  'url': 'http://www.sanger.ac.uk/mouseportal/solr/select',
//  'data': {'wt':'json', 'q':mgiAccession},
//  'success': function(data) { 
//      var doc=data.response.docs[0];
//      chromosome=doc.chromosome;
//      start=doc.coord_start-1000;
//      stop=doc.coord_end+1000;
//      console.debug('chromosome='+chromosome+' ' +start+' '+stop);
//      thisB.setLocation(start, stop, chromosome);
//       
//       /* process e.g. data.response.docs... */ },
//  'dataType': 'jsonp',
//  'jsonp': 'json.wrf'});
//});
//    
//}
//        
        //end of jw stuff
}