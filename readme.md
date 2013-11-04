#Intro to jQuery

jQuery is the next step in a long line of abstraction from the early days of the internet. 

This repo is a simple step-by-step introduction to basic concepts in jQuery. It was these simple exercises that helped me to greater understand how jQuery works, so I hope that this helps you too as well. 

The repo has a very simple directory with the step-by-step examples named appropriately. Comments within the code are there to explain the feature being addressed within the example. 

##When the internet began

When we first started developing web sites, the common concept was to use `tables` and inline-styles. All this markup had negative effects on load time of early web pages. Not to mention, negative effects on early screen readers and search engines. It was difficult to filter out the actual content from all the presentation code. 

To resolve these issues, the HTML and CSS communities came together by creating a real separation of concerns. By reducing the amount of presentational code in the markup, this increased the ability of screen readers and web crawlers to access the real content in the web page.

With the increasing power of computers and internet broadband speeds, developers began to take more advantage of increasingly advanced technologies like JavaScript to push dynamic content to the client(browser).

Initially interactive JavaScript code was included with the markup much like how presentational CSS was originally. This technique created almost identical problems with screen readers and search engines. Not to mention the ever going issues with cross-browser compatibility. 

Advocates for a better web worked together to come up with better, more unobtrusive JavaScrip techniques. Whereas CSS was the separation of presentation from the document, writing unobtrusive JavaScript was a separation of behavior from the document. 

##Let's look at the following JavaScript.

1. When simply using a hash as the link `href="#"`, if JavaScript is disabled, the user will have no way to access the content
1. The actual URL is hidden inside the JavaScript, so there is no way for screen readers or search engines to follow the link
1. Using `return false` to over-ride the default features of the `href` functions

```
<a href="#" onClick="javascript:window.open('popup.html'); return false;">Popup</a>
``` 

###Unobtrusive JavaScript without jQuery

With JavaScript and jQuery in particular, we can use CSS selectors to abstract away the behavior of the content in the document. Using the previous example, lets update the markup.


```
<a href="#" class="new_window">Popup</a>
```

Then we will move the previous functionality to the JavaScript section of our document.

```
	<script type="text/javascript">
		window.onload = function() {
			var anchors = document.getElementsByTagName('a');
			for(var i = 0; i < anchors.length; i++) {
				var anchor = anchors[i];
				if(anchor.className == "new_window") {
					anchor.onclick = function(){
						var href = this.href;
						window.open(href);
						return false;
					}
				}
			}
		}
	</script>
```

1. `window.onload` is executed after the page loads
1. `for(var i = 0; i < anchors.length; i++)` will iterate through all the anchors looking for our test `anchor.className == "new_window"`
1. `anchor.onclick` over-rides any default behavior 
1. `document.getElementsByTagName('a')` in conjunction with `if(anchor.className == "new_window")` is a method to support older browsers that don't support `.className`
1. `if(anchor.className == "new_window")` is fragile, if more then one class appears with this selector, this would break
1. `window.open(href);` is the desired functionality 
1. `return false` tell the browser to not load the page in the same window, basically over-riding default functionality. If JavaScript is switched off, the link will work as expected.

This is an example of unobtrusive JavaScript without jQuery. There are a number of issues with this script other then the fact that this is a hell of a lot of code for simply making a pop up window!

###Unobtrusive JavaScript w/jQuery

The best way to overcome all the issues above is to use unobtrusive jQuery. Mainly, the `onReady` handler in jQuery which executes when the HTML has downloaded, but the images sill haven't, so the JavaScript fires even though the rest of the page is coming into view. 

	<script type="text/javascript">
		$("a.new_window").click(function(){
			window.open(this.href);
			return false;
		});
	</script>
	
1. jQuery makes use of CSS selectors `("a.new_window")`
1. By making use of standard selectors, jQuery removes most issues with cross browser compatibility issues
1. `.click(function()` binds the click event to the `a.new_window` selector
1. `window.open(this.href)` is a very powerful statement. `this` allows the JavaScript reset the content of the markup the selector is applied to so that it will grab the `href` from the `<a>` tag bound to the `window.open` object and method. 

##Loading the jQuery library 

h5bp tell us to load jQuery this way

	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/vendor/jquery-2.0.3.min.js"><\/script>')</script>
	
There are a number of advantages to this. Mainly there is a speed issue. There is a greater chance that Google's CDN is faster then yours. The next is, a cached version. If your user has visited another site that used the Google CDN version, then when your user's browser sees this link, it's not downloaded again. There is nothing faster then not downloading. 

The best reasons you would want to keep this local is for security or enterprise architecture reasons. 

###Load jQuery in the `<head>`

There are a few ways to load jQuery into your project. One way is to load the `script` tag in the `<head>`

	<head>
		<title>This is a title</title>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="js/vendor/jquery-2.0.3.min.js"><\/script>')</script>
	</head>
	
By placing the tag here, this means that you need to use the `$(document).ready(function()` callback to execute the jQuery. 

When the HTML document has loaded and is ready to take advantage of jQuery, the anonymous `function()`, or handler, is executed and the code is run.

	<script type="text/javascript">
		$(document).ready(function() {
			...
		});
	</script>

###Load jQuery in the `<body>`

The second, and most suggested and common, is to load the jQuery library and custom JavaScript at the bottom of the page, just before the closing `</body>` tag.

	<body>
		...


		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="js/vendor/jquery-2.0.3.min.js"><\/script>')</script>
	</body>
	
Using jQuery this way, you are not required to use the `.ready` event as the page has already download and is ready. 

	<body>
		...
		
		
		<script type="text/javascript">
			$('p').text('Hello jQuery');
		</script>
	</body>

