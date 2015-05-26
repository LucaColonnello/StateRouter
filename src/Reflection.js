var Reflection = (function(){
  var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
  var FN_ARG_SPLIT = /\s*,\s*/;
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

  return {

    getArgs: function(target) {
      var text = target.toString();
      var args = text.match(FN_ARGS)[1].split(FN_ARG_SPLIT);
      for( var i=0; i < args.length; i++ ) {
        args[i] = args[i].trim( );
      }

      return ( (args[0] == "") ? [ ] : args );
    }

  };
})( );

module.exports = Reflection;