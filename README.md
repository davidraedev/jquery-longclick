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

#Caveats
Since we are tracking our own double, triple, etc clicks. There will be a slight delay between the end of the click action and the start of its callback. This is because we have to wait a little to see if the user will click again.

This is unavoidable, but has been minimized as much as possible. There is no delay on the 'last' click by not waiting if there are no click callbacks past the current number of clicks. It is also tweakable with the 3rd argument, but 200ms is about the lowest you can go for mouse clicking.
