
// Rotation some of the flakes
function setRotate (self) {
	var degree = 0;
	
	return function () {
		degree += 10;
		
		if (degree > 360)
			degree = 0;
		
		console.log ('Degree: '+degree);
		
		self.css({
			'-webkit-transform' : 'rotate(' + degree + 'deg)',
	        '-moz-transform' : 'rotate(' + degree + 'deg)',
	        '-ms-transform' : 'rotate(' + degree + 'deg)',
	        'transform' : 'rotate(' + degree + 'deg)'
	    });
	};
}

// the function for animating
function fallingSnow (i, defaultParams) {
	
	// reset the position
	$(i).css({
		'top':'-'+defaultParams.maxSnowSize+'px',
		'opacity':1
		});
	
	// get the window size
	var wHeight = $(window).height();
	var wWidth  = $(window).width();
	
	var leftStartPosition = Math.floor(wWidth*Math.random());
	$(i).css('left', leftStartPosition+'px');
	
	// set the snow flake
	$(i).children('.snow-flakes').eq(0).html('&#'+( 33 + Math.floor( (123-33) * Math.random() ) )+';')
		.css('font-size', ( defaultParams.minSnowSize + Math.floor( (defaultParams.maxSnowSize - defaultParams.minSnowSize) * Math.random() ) )+'px');
	
	// left or right deviation
	var direction = Math.random();
	var deviation = defaultParams.maxDeviation * Math.random() * leftStartPosition;
	var endLeftPosition = leftStartPosition;
	
	if (direction <= 0.5)
		endLeftPosition -= deviation;
	else
		endLeftPosition += deviation;
	
	// check
	if (endLeftPosition < 0)
		endLeftPosition = 0.1 * wWidth;
	else if (endLeftPosition > wWidth)
		endLeftPosition = 0.9 * wWidth;
	
	$(i).animate({
			opacity: 0,
			top: 0.9*wHeight + 'px',
			left: endLeftPosition + 'px'
		},
		defaultParams.minSpeed + Math.floor( (defaultParams.maxSpeed - defaultParams.minSpeed) * Math.random() ),
		function() { 
			fallingSnow (i, defaultParams);
		} ) ;
	
}

(function ($) {
	$.fn.snowing = function (options) {
		
		var defaultParams = {
				numberOfElements: 50,
				minSnowSize: 15,
				maxSnowSize: 30,
				minSpeed: 5000,
				maxSpeed: 30000,
				maxDeviation: 0.2,
				rotationInterval: 100,
				rotationRatio: 0.5,
				zIndex: 0
		};
		
		var params = $.extend(defaultParams, options);
				
		// create the basic elements
		for(var i=0; i < params.numberOfElements; i++){
			$(this).append ('<div><span class="snow-flakes"></span></div>');
		}
		
		// set css the the containers
		$('div .snow-flakes').each(function() {
			$(this).parent().css({
				'position':'absolute',
				'top':'-'+params.maxSnowSize+'px',
				'left':'0px',
				'z-index':params.zIndex
				});
		});
		
		// The rotation effect
		if (params.rotationRatio > 0) {
			for (var i=0; i < params.numberOfElements; i += Math.floor(1/params.rotationRatio) ) {
				self = $('div .snow-flakes').eq(i).parent();
				setInterval(setRotate(self), params.rotationInterval);
			}
		}
		
		// start the animation
		$('div .snow-flakes').each(function() {
			
			// get the window size
			var wHeight = $(window).height();
			var wWidth  = $(window).width();
			
			// set the element's left
			var leftStartPosition = Math.floor(wWidth*Math.random());
			$(this).parent().css('left', leftStartPosition+'px');
			
			// set the snow flake
			$(this).html('&#'+( 33 + Math.floor( (123-33) * Math.random() ) )+';')
				.css('font-size', ( params.minSnowSize + Math.floor( (params.maxSnowSize - params.minSnowSize) * Math.random() ) )+'px');
			
			// left or right deviation
			var direction = Math.random();
			var deviation = params.maxDeviation * Math.random() * leftStartPosition;
			var endLeftPosition = leftStartPosition;
			
			if (direction <= 0.5)
				endLeftPosition -= deviation;
			else
				endLeftPosition += deviation;
			
			// check
			if (endLeftPosition < 0)
				endLeftPosition = 0.1 * wWidth;
			else if (endLeftPosition > wWidth)
				endLeftPosition = 0.9 * wWidth;
			
			$(this).parent().animate({
					opacity: 0,
					top: 0.9*wHeight + 'px',
					left: endLeftPosition + 'px'
				},
				params.minSpeed + Math.floor( (params.maxSpeed - params.minSpeed) * Math.random() ),
				function() { 
					fallingSnow (this, params);
				} ) ;
			
			
		});
		
		// return this
		return this;
	};
}) (jQuery) ;