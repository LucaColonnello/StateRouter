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
        uri: "/",
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
        uri: "/dashboard",
        parent: false,
        handler: function( ) { }
     } );
     routesCollection.addRoute( r );

     assert( routesCollection.getRoute( "dashboard" ), r );
     assert.equal( r.paramIndexing, false );
     assert( r.completeUrl, "/dashboard" );
     assert( r.regexp, "\\/dashboard" );
     assert( r.getUrl( ), "/dashboard" );
    });

    it('should get /news-category-55', function( ){
     var r = new Route( routesCollection, {
        name: "news-category",
        uri: "/news-category-[category_id]",
        parent: false,
        handler: function( ) { }
     } );
     routesCollection.addRoute( r );

     assert( routesCollection.getRoute( "news-category" ), r );
     assert( r.paramIndexing.length > 0, true );
     assert( r.completeUrl, "/news-category-[category_id]" );
     assert( r.regexp, "\\//news\\-category\\-([0-9a-zA-Z\\_]+)" );
     assert( r.getUrl( {
      category_id: 55
     } ), "/news-category-55" );
    });

    it('should get /news-category-55/post-15.html', function( ){
     var r = new Route( routesCollection, {
        name: "news-post",
        parent: "news-category",
        uri: "/[post_title]-[post_id].html",
        handler: function( ) { }
     } );
     routesCollection.addRoute( r );

     assert( routesCollection.getRoute( "news-post" ), r );
     assert( r.paramIndexing.length > 0, true );
     assert( r.completeUrl, "/news-category-[categoryid]/[post_title]-[post_id].html" );
     assert( r.regexp, "\\//news\\-category\\-([0-9a-zA-Z\\_]+)\\/([0-9a-zA-Z\\_]+)\\-([0-9a-zA-Z\\_]+)\\.html" );
     assert( r.getUrl( {
      category_id: 55,
      post_id: 15,
      post_title: "post"
     } ), "/news-category-55/post-15.html" );
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