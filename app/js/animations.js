var ajwAnimations = angular.module('ajwAnimations', ['ngAnimate']);

ajwAnimations.animation( '.leader-row', function() {
  return {
    enter: function( element, done ) {
      element.css( 'display', 'none' );
      $(element).fadeIn( 1000, function() { done(); } );
    },
    leave: function( element, done ) {
      $(element).fadeOut( 1000, function() { done(); } );
    },
    move: function( element, done ) {
    
    }
  }
});

