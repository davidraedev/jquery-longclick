/*!
 * jQuery Longclick v2.0 (2016-02-20)
 * https://github.com/daraeman/jquery-longclick
 * Copyright 2016 David Rae
 * Released under the MIT license
 */

(function( $ ) {

	$.fn.longclick = function( callbacks, ignore_drag, click_duration, fire_multiple ) {
		var self = this;
			self.current_element = false;
			self.current_clicks = false;
			self.current_click_time = false;

		callbacks = callbacks || [];
		if ( ! callbacks.length )
			return false;
		else {
			var max_clicks = 0;
			for ( i = 0; i < callbacks.length; i++ )
				if ( max_clicks < callbacks[i].clicks )
					max_clicks = callbacks[i].clicks;
		}
		ignore_drag = ignore_drag || true;
		click_duration = click_duration || 250;
		fire_multiple = fire_multiple || false;

		var clickTimeout,
			did_move = false;

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

		self.unbind( start )
			.unbind( end )
			.on( start, function(e){
				clearTimeout( clickTimeout );
				if ( self.current_element == e.target ) {
					if ( (e.timeStamp - self.current_click_time) >= click_duration )
						self.current_clicks = 1;
					else
						self.current_clicks++;
				}
				else {
					self.current_element = e.target;
					self.current_clicks = 1;
				}
				self.current_click_time = e.timeStamp;
				$(this).on( move, function(e){
					did_move = true;
					$(this).unbind( move );
				});
			})
			.on( end, function(e){
				var el = $(this);
				function doCallback(e) {
					if ( ! did_move || ( did_move && ignore_drag ) ) {
						var time_diff = ( e.timeStamp - self.current_click_time );
						for ( i = 0; i < callbacks.length; i++ ) {
							if ( callbacks[i].duration >= time_diff && callbacks[i].clicks == self.current_clicks ) {
								callbacks[i].clickEnd( $(self.current_element), e );
								self.current_element = false;
								self.current_clicks = false;
								self.current_click_time = false;
								break;
							}
						}
					}
					el.unbind( move );
				}
				if ( fire_multiple )
					doCallback(e);
				else {
					if ( self.current_clicks == max_clicks )
						doCallback(e);
					else {
						clickTimeout = setTimeout(function(){
							doCallback(e);
						}, click_duration );
					}
				}
			});

		$( "body" ).on( "click.jquery_longclick", function(e){
			if ( self.current_element != e.target ) {
				self.current_element = false;
				self.current_clicks = false;
				self.current_click_time = false;
			}
		});
	};
 
}( jQuery ));