var 
    after = require('after')
  , Route = require("../src/Route")
  , RoutesCollection = require('../src/RoutesCollection')
  , assert = require('assert');

var routesCollection = new RoutesCollection( );

describe('Route', function( ) {
  describe('create', function(){
    it('should create a Route', function(done){
     var r = new Route( routesCollection, {
        name: "index",
        url: "/",
        parent: false,
        handler: function( ) { }
     } );

     done( );
    });

    it('should throw an error', function(done) {
      try {
        var r = new Route( null, false );
      } catch (e){
        done( );
      }
    });
  });

  describe('getUrl', function(){
    it('should get /dashboard', function( ){
     var r = new Route( routesCollection, {
        name: "dashboard",
        url: "/dashboard",
        parent: false,
        handler: function( ) { }
     } );
     routesCollection.addRoute( r );

     assert.deepEqual( routesCollection.getRoute( "dashboard" ), r );
     assert.deepEqual( r.navigationTree, [ "dashboard" ] );
     assert.equal( r.paramIndexing, false );
     assert.equal( r.completeUrl, "/dashboard" );
     assert.equal( r.regexp, "\\/dashboard" );
     assert.equal( r.getUrl( ), "/dashboard" );
    });

    it('should get /news-category-55', function( ){
     var r = new Route( routesCollection, {
        name: "news-category",
        url: "/news-category-[category_id]",
        parent: false,
        validationRules: {
          category_id: /^[0-9]+$/
        },
        handler: function( ) { }
     } );
     routesCollection.addRoute( r );

     assert.deepEqual( routesCollection.getRoute( "news-category" ), r );
     assert.deepEqual( r.navigationTree, [ "news-category" ] );
     assert.equal( r.paramIndexing.length > 0, true );
     assert.equal( r.completeUrl, "/news-category-[category_id]" );
     assert.equal( r.regexp, "\\/news-category-([0-9a-zA-Z\\_\\-]+)" );
     assert.equal( r.getUrl( {
      category_id: 55
     } ), "/news-category-55" );
    });

    it('should throw an error with category_id: ciao', function( done ){
      try {
        routesCollection.getRoute( "news-category" ).getUrl( {
          category_id: "ciao"
        } );
      } catch( e ) {
        done( );
      }
    });

    it('should get /news-category-55/post-15.html', function( ){
     var r = new Route( routesCollection, {
        name: "news-post",
        parent: "news-category",
        url: "/[post_title]-[post_id].html",
        validationRules: {
          post_title: /^[A-Za-z0-9\-\_]+$/,
          post_id: /^[0-9]+$/
        },
        handler: function( ) { }
     } );
     routesCollection.addRoute( r );

     assert.deepEqual( routesCollection.getRoute( "news-post" ), r );
     assert.deepEqual( r.navigationTree, [ "news-category", "news-post" ] );
     assert.equal( r.paramIndexing.length > 0, true );
     assert.equal( r.completeUrl, "/news-category-[category_id]/[post_title]-[post_id].html" );
     assert.equal( r.regexp, "\\/news-category-([0-9a-zA-Z\\_\\-]+)\\/([0-9a-zA-Z\\_\\-]+)-([0-9a-zA-Z\\_\\-]+).html" );
     assert.equal( r.getUrl( {
      category_id: 55,
      post_id: 15,
      post_title: "post"
     } ), "/news-category-55/post-15.html" );
    });

    it('should throw an error with category_id: ciao, post_id: ciao', function( done ){
      try {
        routesCollection.getRoute( "news-post" ).getUrl( {
          category_id: "ciao",
          post_id: "ciao",
          post_title: "ciao"
        } );
      } catch( e ) {
        done( );
      }
    });

  });

  describe('match', function(){
    it('dashboard should match /dashboard', function( ){
     var r = routesCollection.getRoute( "dashboard" );
     assert.deepEqual( r.match( "/dashboard" ), {
      match: true,
      param: false
     } );
    });

    it('news-category should match /news-category-55', function( ){
     var r = routesCollection.getRoute( "news-category" );
     assert.deepEqual( r.match( "/news-category-55" ), {
      match: true,
      param: {
        category_id: "55"
      }
     } );
    });

    it('news-post should match /news-category-55/post-title-15.html', function( ){
     var r = routesCollection.getRoute( "news-post" );
     assert.deepEqual( r.match( "/news-category-55/post-title-15.html" ), {
      match: true,
      param: {
        category_id: "55",
        post_id: "15",
        post_title: "post-title"
      }
     } );
    });
  });

});