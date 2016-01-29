/*!
 * jQuery Longclick v1.0.1 (2016-01-29)
 * https://github.com/daraeman/jquery-longclick
 * Copyright 2016 David Rae
 * Released under the MIT license
 */

(function( $ ) {
 
    $.fn.longclick = function( long_callback, short_callback, long_duration, cancel_on_move ) {

    	var timer,
			did_fire = false,
			mousedown_time = 0;
		long_duration = ( parseInt( long_duration ) && (long_duration >= 0) ) ? long_duration : 500;
		cancel_on_move = ( cancel_on_move );

		if ( "ontouchstart" in document.documentElement ) {
			var start = "touchstart.longclick";
			var end = "touchend.longclick";
			var move = "touchmove.longclick";
		}
		else {
			var start = "mousedown.longclick";
			var end = "mouseup.longclick";
			var move = "mousemove.longclick";
		}

		this.unbind( start )
			.unbind( end )
			.on( start, function(e){
				var el = $(this);
				mousedown_time = e.timeStamp;
				timer = window.setTimeout(function() {
					did_fire = true;
					mousedown_time = 0;
					el.unbind( move );
					long_callback();
				}, long_duration );
				if ( cancel_on_move ) {
					el.on( move, function(e){
						if ( timer && ( e.timeStamp - mousedown_time ) > 10 ) {
							clearTimeout( timer );
							timer = null;
							did_fire = false;
						}
						return false;
					});
				}
				return false; 
			})
			.on( end, function(e){
				clearTimeout( timer );
				timer = null;
				$( this ).unbind( move );
				mousedown_time = 0;
				if ( ! did_fire ) {
					short_callback();
				}
				did_fire = false;
				return false;
			});
	};
 
}( jQuery ));
