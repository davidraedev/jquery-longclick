# [jquery-longclick](https://daraeman.github.io/jquery-longclick)
Set arbitrary amount of time based clicks (100ms, 500ms... click), and abitrary amount of click based clicks (double, triple... click)

# Usage:
```
$( el ).longclick(
	callbacks,
	ignore_dragging = true,
	max_time_between_clicks = 250,
	fire_every_click_up_to_the_final = false
);
```
```
$( el ).longclick( [
	{
		clickEnd: function(){
			// Single click, 150 millis
		},
		duration: 150,
		clicks: 1
	},
	{
		clickEnd: function(){
			// Single click, 1 second
		},
		duration: 1000,
		clicks: 1
	},
	{
		clickEnd: function(){
			// Double click, 1 second
		},
		duration: 1000,
		clicks: 2
	},
], true, 200, true );
```
