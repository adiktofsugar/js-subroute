define (['Backbone', 'Underscore', 'log'], function (Backbone, _) {
	var log = new Log({
		logState : 'debug'
	});

	var 
	// @param route string
	toRegExp = Backbone.Router.prototype._routeToRegExp,
	
	// @param route RegExp
	// @param fragment string
	extractParams = Backbone.Router.prototype._extractParameters;
	
	return function( obj, prefix ) {
		//this is going to take an object
		// with routes and route methods as properties
		// and give the obj a method to process.
		
		
		//This is for future use...I'm not really sure what to do with it now...
		prefix = prefix || '';
		//modify routes to use this prefix
		var newRoutes = {};
		for (var key in obj.routes) {
			if (!obj.routes.hasOwnProperty(key)) continue;
			
			newRoutes[prefix + key] = obj.routes[key];
		}
		obj.absoluteRoutes = newRoutes;
		
		
		obj.process = function (subroute) {
			//videosApp.router[ videosApp.router.routes[subroute] ]();	
			
			//check if this subroute matches any of my routes
			for (var route in obj.routes) {
				if ( !obj.routes.hasOwnProperty(route) ) continue;
				
				//first get the regexp and params
				var re = toRegExp(route),
					params;
				
				try{
					params = extractParams(re, subroute);
				} catch (e) {
					//didn't work out, which most likely means the regex didnt go through
					continue;
				}
				
				
				//I have the params...so now I just need to pass it to this function
				var fKey = obj.routes[route],
					f = obj[fKey];
					
				f.apply(this, params);
				return true;
			}
			return false;
		}
		
		return obj;
	};

});