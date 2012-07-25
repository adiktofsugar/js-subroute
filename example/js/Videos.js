define (['jquery', 'Underscore', 'Backbone'], function ($, _, Backbone) {

	
	var App = Backbone.View.extend({
	
		initialize : function () {
			_.bindAll('render');
			
			var self = this;
			
			this.state = '';
			this.$stateHolder = $('<h4></h4>')
				.prependTo(this.$el);
			
			
			this.router = {
			
				routes : {
					'/':				'home',
					'/details':			'details',
					'/details/:id':		'detail', //different from details, mind you
				},
				
				home : function () {
					self.state = 'VIDEO HOME';
					self.render();
				},
				detail : function (id) {
					self.state = 'DETAIL FOR ' + id;
					self.render();
				},
				details : function () {
					self.state = 'VIDEO DEATILS';
					self.render();
				}
			
			};
			
		},
		
		render : function () {
			this.$stateHolder.text( this.state );
		}
	});
	
	
	return App;

});