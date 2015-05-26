var 
    after = require('after')
  , Route = require("../src/Route")
  , MatchedRoute = require("../src/MatchedRoute")
  , RoutesCollection = require('../src/RoutesCollection')
  , assert = require('assert');


describe('MatchedRoute', function( ) {
  var
        routesCollection
      , matchedRouteTest1
      , matchedRouteTest2
      , matchedRouteTest3;

  before(function( ) {
    // create routes collection
    routesCollection = new RoutesCollection( );
    
    // test handler without reflection
    var test1 = new Route( routesCollection, {
        name: "test_handler",
        url: "/test1",
        parent: false,
        handler: function( ) {
          this.set = true;
          this.entered = false;
          this.exited = false;
          this.updated = false;
          this.destroyed = false;

          this.enter = function( ) {
            this.entered = true;
          };

          this.exit = function( ) {
            this.exited = true;
          };

          this.update = function( ) {
            this.updated = true;
          };

          this.destroy = function( ) {
            this.destroyed = true;
          };
        }
    } );

    // test handler with reflection
    var test2 = new Route( routesCollection, {
        name: "test_handler_reflection",
        url: "/test2",
        parent: false,
        handler: function( route, url, param ) {
          this.route = route;
          this.url = url;
          this.param = param;

          this.enter = function( next ){
            next( );
          };

          this.exit = function( next ){
            next( );
          };

          this.destroy = function( next ){
            next( );
          };
        }
    } );

    // test handler without functions
    var test3 = new Route( routesCollection, {
        name: "test_blank_handler",
        url: "/test3",
        parent: false,
        handler: function( ) { }
    } );

    // create matched route for tests
    matchedRouteTest1 = new MatchedRoute( test1, "/test1", false );
    matchedRouteTest2 = new MatchedRoute( test2, "/test2", false );
    matchedRouteTest3 = new MatchedRoute( test3, "/test3", false );
  });

  describe('setup', function( ){
    it('should setup the route that doesn\'t accept parameters', function( ) {
      matchedRouteTest1.setup( );
      assert.equal( matchedRouteTest1.handlerInstance.set, true );
    });

    it('should setup the route that accept parameters', function( ) {
      matchedRouteTest2.setup( );
      assert.deepEqual( matchedRouteTest2.handlerInstance.route, matchedRouteTest2.route );
      assert.equal( matchedRouteTest2.handlerInstance.url, matchedRouteTest2.url );
      assert.equal( matchedRouteTest2.handlerInstance.param, matchedRouteTest2.param );
    });

    it('should setup the blank route', function( done ) {
      matchedRouteTest3.setup( );
      done( );
    });
  });

  describe('enter', function(){
    it('should enter the route that doesn\'t accept parameters', function( done ) {
      matchedRouteTest1.enter( done );
      assert.equal( matchedRouteTest1.handlerInstance.entered, true );
    });

    it('should enter the route that accept parameters', function( done ) {
      matchedRouteTest2.enter( done );
    });

    it('should enter the blank route', function( done ) {
      matchedRouteTest3.enter( done );
    });
  });

  describe('exit', function(){
    it('should exit the route that doesn\'t accept parameters', function( done ) {
      matchedRouteTest1.exit( done );
      assert.equal( matchedRouteTest1.handlerInstance.exited, true );
    });

    it('should exit the route that accept parameters', function( done ) {
      matchedRouteTest2.exit( done );
    });

    it('should exit the blank route', function( done ) {
      matchedRouteTest3.exit( done );
    });
  });

  describe('update', function(){
    it('should update the route that doesn\'t accept parameters', function( done ) {
      matchedRouteTest1.update( done );
      assert.equal( matchedRouteTest1.handlerInstance.updated, true );
    });

    it('should update the route that accept parameters', function( done ) {
      matchedRouteTest2.update( done );
    });

    it('should update the blank route', function( done ) {
      matchedRouteTest3.update( done );
    });
  });

  describe('destroy', function(){
    it('should destroy the route that doesn\'t accept parameters', function( done ) {
      matchedRouteTest1.destroy( done );
      assert.equal( matchedRouteTest1.handlerInstance.destroyed, true );
    });

    it('should destroy the route that accept parameters', function( done ) {
      matchedRouteTest2.destroy( done );
    });

    it('should destroy the blank route', function( done ) {
      matchedRouteTest3.destroy( done );
    });
  });

});