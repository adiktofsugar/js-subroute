Subroute
=====

This is a function for backbone routing issues....mostly because I couldn't get the
backbone-subroute to work the way I wanted it to.

The way it works
------
When I set up a router, I set it up within an app, like this.
	
	var videoApp = new Videos({
		el : 'section#videos'
	});
	
	var App = Backbone.View.extend({
		initialize : function () {
			_.bindAll(this, 'render');
			var self = this;
			
			this.Router = Backbone.Router.extend({
				routes : {
					home : '',
					videos*frag : 'videos',
				},
				
				home : function () {
					var s = this.$el.find('section#home').slideIn();
					this.$el.children().not(s).slideUp();
				},
				videos : function (fragment) {
					var s = this.$el.find('section#videos').slideIn();
					this.$el.children().not(s).slideUp();
					
					if (!self.videoRoutes) {
						self.videoRouter = subroute(videoApp.router);
					}
					self.videoRouter.process(fragment);
				},
				
			});
			
			new this.Router();
		}
	});
	
So, with this set up (that I didn't check for accuracy...) the main router is processing
two routes, 'home' and 'videos*'. The latter matches videos and everything after it, which
is passed into a function to use. It instantiates the router if it's not already, and then calls
it's process function.

ABOUT THE SUBROUTER
==========

It's not a real router.

I know. Dont judge. Here's the Video router

	...
	this.router = {
		routes : {
			'/':		'home',
			'/list':	'list'
		},
		'home' : function () {
			this.state = 'home';
			this.render();
		},
		'list' : function () {
			this.state = 'list';
			this.render();
		}
	};
	...
	
And that's about it. I haven't really tested anything because this is the "im making an experiment" stage
I'll add tests...and check to see if it works with variables...later.