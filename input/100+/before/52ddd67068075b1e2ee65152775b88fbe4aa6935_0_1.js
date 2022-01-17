function LeafClusterer(map, opt_markers, opt_opts) {
  // private members
  var clusters_ = [];
  var map_ = map;
  var maxZoom_ = null;
  var me_ = this;
  var gridSize_ = 40;
  var sizes = [53, 56, 66, 78, 90];
  var styles_ = [];
  var leftMarkers_ = [];
  var mcfn_ = null;

  var i = 0;
  for (i = 1; i <= 5; ++i) {
    styles_.push({
      'url': "http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/images/m" + i + ".png",
      'height': sizes[i - 1],
      'width': sizes[i - 1]
    });
  }

  if (typeof opt_opts === "object" && opt_opts !== null) {
    if (typeof opt_opts.gridSize === "number" && opt_opts.gridSize > 0) {
      gridSize_ = opt_opts.gridSize;
    }
    if (typeof opt_opts.maxZoom === "number") {
      maxZoom_ = opt_opts.maxZoom;
    }
    if (typeof opt_opts.styles === "object" && opt_opts.styles !== null && opt_opts.styles.length !== 0) {
      styles_ = opt_opts.styles;
    }
  }

  /**
   * When we add a marker, the marker may not in the viewport of map, then we don't deal with it, instead
   * we add the marker into a array called leftMarkers_. When we reset LeafClusterer we should add the
   * leftMarkers_ into LeafClusterer.
   */
  function addLeftMarkers_() {
    if (leftMarkers_.length === 0) {
      return;
    }
    var leftMarkers = [];
    for (i = 0; i < leftMarkers_.length; ++i) {
      me_.addMarker(leftMarkers_[i], true, null, null, true);
    }
    leftMarkers_ = leftMarkers;
  }

  /**
   * Get cluster marker images of this marker cluster. Mostly used by {@link Cluster}
   * @private
   * @return {Array of String}
   */
  this.getStyles_ = function () {
    return styles_;
  };

  /**
   * Remove all markers from LeafClusterer.
   */
  this.clearMarkers = function () {
    for (var i = 0; i < clusters_.length; ++i) {
      if (typeof clusters_[i] !== "undefined" && clusters_[i] !== null) {
        clusters_[i].clearMarkers();
      }
    }
    clusters_ = [];
    leftMarkers_ = [];
    map.off(mcfn_);
  };

  /**
   * Check a marker, whether it is in current map viewport.
   * @private
   * @return {Boolean} if it is in current map viewport
   */
  function isMarkerInViewport_(marker) {
    return map_.getBounds().contains(marker.getLatLng());
  }

  /**
   * When reset LeafClusterer, there will be some markers get out of its cluster.
   * These markers should be add to new clusters.
   * @param {Array of GMarker} markers Markers to add.
   */
  function reAddMarkers_(markers) {
    var len = markers.length;
    var clusters = [];
    for (var i = len - 1; i >= 0; --i) {
      me_.addMarker(markers[i].marker, true, markers[i].isAdded, clusters, true);
    }
    addLeftMarkers_();
  }

  /**
   * Add a marker.
   * @private
   * @param {GMarker} marker Marker you want to add
   * @param {Boolean} opt_isNodraw Whether redraw the cluster contained the marker
   * @param {Boolean} opt_isAdded Whether the marker is added to map. Never use it.
   * @param {Array of Cluster} opt_clusters Provide a list of clusters, the marker
   *     cluster will only check these cluster where the marker should join.
   */
  this.addMarker = function (marker, opt_isNodraw, opt_isAdded, opt_clusters, opt_isNoCheck) {
    if (opt_isNoCheck !== true) {
      if (!isMarkerInViewport_(marker)) {
        leftMarkers_.push(marker);
        return;
      }
    }

    var isAdded = opt_isAdded;
    var clusters = opt_clusters;
    var pos = map_.latLngToLayerPoint(marker.getLatLng());

    if (typeof isAdded !== "boolean") {
      isAdded = false;
    }
    if (typeof clusters !== "object" || clusters === null) {
      clusters = clusters_;
    }

    var length = clusters.length;
    var cluster = null;
    for (var i = length - 1; i >= 0; i--) {
      cluster = clusters[i];
      var center = cluster.getCenter();
      if (center === null) {
        continue;
      }
      center = map_.latLngToLayerPoint(center);

      // Found a cluster which contains the marker.
      if (pos.x >= center.x - gridSize_ && pos.x <= center.x + gridSize_ &&
          pos.y >= center.y - gridSize_ && pos.y <= center.y + gridSize_) {
        cluster.addMarker({
          'isAdded': isAdded,
          'marker': marker
        });
        if (!opt_isNodraw) {
          cluster.redraw_();
        }
        return;
      }
    }

    // No cluster contain the marker, create a new cluster.
    cluster = new Cluster(this, map);
    cluster.addMarker({
      'isAdded': isAdded,
      'marker': marker
    });
    if (!opt_isNodraw) {
      cluster.redraw_();
    }

    // Add this cluster both in clusters provided and clusters_
    clusters.push(cluster);
    if (clusters !== clusters_) {
      clusters_.push(cluster);
    }
  };

  /**
   * Remove a marker.
   *
   * @param {GMarker} marker The marker you want to remove.
   */

  this.removeMarker = function (marker) {
    for (var i = 0; i < clusters_.length; ++i) {
      if (clusters_[i].remove(marker)) {
        clusters_[i].redraw_();
        return;
      }
    }
  };

  /**
   * Redraw all clusters in viewport.
   */
  this.redraw_ = function () {
    var clusters = this.getClustersInViewport_();
    for (var i = 0; i < clusters.length; ++i) {
      clusters[i].redraw_(true);
    }
  };

  /**
   * Get all clusters in viewport.
   * @return {Array of Cluster}
   */
  this.getClustersInViewport_ = function () {
    var clusters = [];
    var curBounds = map_.getBounds();
    for (var i = 0; i < clusters_.length; i ++) {
      if (clusters_[i].isInBounds(curBounds)) {
        clusters.push(clusters_[i]);
      }
    }
    return clusters;
  };

  /**
   * Get max zoom level.
   * @private
   * @return {Number}
   */
  this.getMaxZoom_ = function () {
    return maxZoom_;
  };

  /**
   * Get map object.
   * @private
   * @return {GMap2}
   */
  this.getMap_ = function () {
    return map_;
  };

  /**
   * Get grid size
   * @private
   * @return {Number}
   */
  this.getGridSize_ = function () {
    return gridSize_;
  };

  /**
   * Get total number of markers.
   * @return {Number}
   */
  this.getTotalMarkers = function () {
    var result = 0;
    for (var i = 0; i < clusters_.length; ++i) {
      result += clusters_[i].getTotalMarkers();
    }
    return result;
  };

  /**
   * Get total number of clusters.
   * @return {int}
   */
  this.getTotalClusters = function () {
    return clusters_.length;
  };

  /**
   * Collect all markers of clusters in viewport and regroup them.
   */
  this.resetViewport = function () {
    var clusters = this.getClustersInViewport_();
    var tmpMarkers = [];
    var removed = 0;

    for (var i = 0; i < clusters.length; ++i) {
      var cluster = clusters[i];
      var oldZoom = cluster.getCurrentZoom();
      if (oldZoom === null) {
        continue;
      }
      var curZoom = map_.getZoom();
      if (curZoom !== oldZoom) {

        // If the cluster zoom level changed then destroy the cluster
        // and collect its markers.
        var mks = cluster.getMarkers();
        for (var j = 0; j < mks.length; ++j) {
          var newMarker = {
            'isAdded': false,
            'marker': mks[j].marker
          };
          tmpMarkers.push(newMarker);
        }
        cluster.clearMarkers();
        removed++;
        for (j = 0; j < clusters_.length; ++j) {
          if (cluster === clusters_[j]) {
            clusters_.splice(j, 1);
          }
        }
      }
    }

    // Add the markers collected into marker cluster to reset
    reAddMarkers_(tmpMarkers);
    this.redraw_();
  };


  /**
   * Add a set of markers.
   *
   * @param {Array of GMarker} markers The markers you want to add.
   */
  this.addMarkers = function (markers) {
    for (var i = 0; i < markers.length; ++i) {
      this.addMarker(markers[i], true);
    }
    this.redraw_();
  };

  // initialize
  if (typeof opt_markers === "object" && opt_markers !== null) {
    this.addMarkers(opt_markers);
  }

  // when map move end, regroup.
  mcfn_ = map_.on("moveend", function () {
    me_.resetViewport();
  });
}