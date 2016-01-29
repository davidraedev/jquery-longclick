/*!
 * jQuery Longclick v1.0 (2016-01-29)
 * https://github.com/daraeman/jquery-longclick
 * Copyright 2016 David Rae
 * Released under the MIT license
 */

(function( $ ) {
 
    $.fn.longclick = function( long_callback, short_callback, long_duration ) {

    	var timer,
			did_fire = false,
			mousedown_time = 0;
		long_duration = ( parseInt( long_duration ) && (long_duration >= 0) ) ? long_duration : 500;

		if ( "ontouchstart" in document.documentElement ) {
			var start = "touchstart";
			var end = "touchend";
			var move = "touchmove";
		}
		else {
			var start = "mousedown";
			var end = "mouseup";
			var move = "mousemove";
		}

		this.unbind( start )
			.unbind( end )
			.on( start, function(e){
				mousedown_time = e.timeStamp;
				timer = window.setTimeout(function() {
					console.log( "long click" )
					long_callback();
					did_fire = true;
					mousedown_time = 0;
					$( e.target ).unbind( move );
				}, long_duration );
				$( e.target )
					.on( move, function(e){
						if ( timer && ( e.timeStamp - mousedown_time ) > 10 ) {
							clearTimeout( timer );
							timer = null;
							did_fire = false;
						}
						return false;
					});
				return false; 
			})
			.on( end, function(e){
				clearTimeout( timer );
				timer = null;
				if ( ! did_fire ) {
					console.log( "short click" )
					short_callback();
				}
				$( e.target ).unbind( move );
				did_fire = false;
				mousedown_time = 0;
				return false;
			});
	};
 
}( jQuery ));
