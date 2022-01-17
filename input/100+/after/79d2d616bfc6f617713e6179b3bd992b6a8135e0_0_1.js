f    'use strict';

    var tmpl;

    var v = new Iterator();

    v.options = {
        container: '#js-poststream',
        postsToRetrieve: 10,
        postsPerPage: 7,
        postsPerAdRotation: 3,
        postsBeforeSponsoredPost: 3,
        activePostCount: 7,
        lookAhead: 5,
        endpoint: '/posts/page/{{page}}/' // should be '/posts/{{count}}'
    };

    v.scrollState = {
        page: 1,
        postsViewed: 0
    };

    v.setup = function( cfg ){
        $.extend( v.options, cfg );

        v.bootstrapPosts().then( v.addPosts );

        window.viewer = v;
        return this;
    };

    v.listen = function(){
        var timerId = null;

        // this should eventually catch a generic "counts-available" event
        // via mc.on( 'counts-available', { type: 'fbshare', counts: [ { id: <asset id>, count: <share count> } ] } );
        mc.on( 'fbshare.countsavailable', function( shares ){
            for ( var i = 0, l = shares.length; i < l; i += 1 ){
                if ( typeof v.collection[ 'aid-' + shares[ i ].id ] === 'object' ){
                    v.collection[ 'aid-' + shares[ i ].id ].set( 'fbshares', shares[ i ].count );
                }
            }
        });

        $( document )
            .on( 'keydown', function( e ){
                switch ( e.keyCode ){
                    // Next: 74 = j, 40 = down arrow
                    case 40:
                    case 74:
                        e.preventDefault();
                        v.hasNext() && v.getNext().emit( 'selected', 1 );
                        break;

                    // Prev: 75 = k, 38 = up arrow
                    case 38:
                    case 75:
                        e.preventDefault();
                        v.hasPrev() && v.getPrev().emit( 'selected', -1 );
                        break;
                }
            })
            .on( 'waypoint.reached', function( e, direction ){
                v.setIndex( $( e.target ).data( 'postIndex' ) );

                timerId && cancelAnimationFrame( timerId );
                timerId = requestAnimationFrame(function(){
                    if ( direction === 'up' ){
                        v.showPreviousPost();
                    } else {
                        v.showNextPost();
                    }
                });

                v.setCurrentPage( direction ).rotateAds();
            });

        return this;
    };

    v.bootstrapPosts = function(){
        var postData = $.parseJSON( $( '#js-postdata' ).html() );

        return {
            then: function( callback ){
                callback( postData );
                return this;
            }
        };
    };

    // todo:
    // + need a more reliable way to track & handle failed page loads
    v.currentPage = 1;
    v.getPosts = function( count ){
        var deferred = $.Deferred(),
            xhr = $.ajax({
                url: v.options.endpoint.replace( '{{page}}', v.currentPage ),
                success: deferred.resolve
            });

        v.currentPage += 1;

        return deferred.promise();
    };

    // todo:
    // + break into addPosts & displayPosts methods so that we can grab lots of posts
    //   at once but only display some subset of the collection we retreive
    // + if we don't know asset dimensions and set waypoint before asset loads,
    //   the waypoint's offset will be inaccurate - perhaps use
    //   post.$el.one( 'load', function(){ post.$el.waypoint() );
    //   but need to set in a closure.. or maybe just call $.waypoints( 'refresh' )
    //   at some appropriate time in the future?
    // + extract the .each() callback into a stand-alone method
    v.addPosts = function( rawPosts ){
        var insertFrom = v.length,
            newlyAddedPosts = [],
            post,
            postView;

        v.add( rawPosts, insertFrom );
        v.each( function( rawPost, idx ){
            if ( idx >= insertFrom ){
                post = new PostModel( rawPost );
                postView = new PostView( post, idx );

                if ( v.shouldAddSponsoredPost( idx ) ){
                    mc.emit( 'ads.addsponsoredpost', v.options.container );
                }

                v.collection[ 'aid-' + post.id ] = post;
                v.update( idx, post );
                newlyAddedPosts.push( post );
            }
        });

        mc.emit( 'iscroll.newcontentadded', newlyAddedPosts );

        return this;
    };

    v.getActivePostsRange = function(){
        var count = Math.round( v.options.activePostCount / 2 );

        if ( v.index - count <= 0 ){
            return {
                start: 0,
                end: v.options.activePostCount
            };
        }

        return {
            start: v.index - count,
            end: v.index + count
        };
    };

    v.trimPostsAbove = function(){
        var activePosts = v.getActivePostsRange();

        if ( activePosts.start > 0 ){
            v.trimPosts( 0, activePosts.start );
        }

        return this;
    };

    v.trimPostsBelow = function(){
        var activePosts = v.getActivePostsRange();

        if ( v.length - activePosts.end > 0 ){
            v.trimPosts( activePosts.end, v.length - 1 );
        }

        return this;
    };

    v.trimPosts = function( from, to ){
        v.each(function( post, idx ){
            if ( idx >= from && idx <= to && post.isActive ){
                post.set( 'isActive', false );
            }
        });

        return this;
    };

    v.resurrectPosts = function(){
        var activePosts = v.getActivePostsRange();

        v.each(function( post, idx ){
            if ( idx >= activePosts.start && idx < activePosts.end && ! post.isActive ){
                post.set( 'isActive', true );
            }
        });

        return this;
    };

    // todo:
    // + checking v.has() causes multiple requests to be made as we exceeed the
    //   length of the collection. v.isLast() would be better but then we can't
    //   recover from home / end jumps. maybe set v.isGettingPosts to true when
    //   fetching and check it before calling v.getPosts()?
    v.showNextPost = function(){
        if ( ! v.has( v.index + v.options.lookAhead ) ){
            v.getPosts( v.options.postsToRetrieve ).then( v.addPosts );
        }

        v.resurrectPosts();
        v.trimPostsAbove();

        return this;
    };

    v.showPreviousPost = function(){
        v.resurrectPosts();
        v.trimPostsBelow();

        return this;
    };

    v.setCurrentPage = function( direction ){
        if ( v.index && v.index % v.options.postsPerPage === 0 ){
            v.scrollState.page += direction === 'up' ? -1 : 1;
            mc.emit( 'iscroll.pageChanged', v.scrollState.page );
        }
        return this;
    };

    v.getCurrentPage = function(){
        return v.scrollState.page;
    };

    // todo:
    // + waypoints fire twice when scrolling up(?) causing
    //   the index to increment inaccurately
    v.rotateAds = function(){
        var adIndex = v.scrollState.postsViewed += 1;
        if ( adIndex % v.options.postsPerAdRotation === 0 ){
            mc.emit( 'ads.rotate' );
        }
        return this;
    };

    v.shouldAddSponsoredPost = function( index ){
        if ( v.scrollState.postsViewed === 0 ){
            return index === v.options.postsBeforeSponsoredPost - 1;
        }

        return ( index - v.options.postsBeforeSponsoredPost + 1 ) % v.options.postsPerPage === 0;
    };

    return v;
});
