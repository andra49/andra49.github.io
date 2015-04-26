var datavizApp = angular.module('datavizApp', []);

// create the controller and inject Angular's $scope
datavizApp.controller('mainController', function($scope) {
	$scope.chart = null;
	$scope.dataset = [{
		name: 'United States',
		shortcode: 'us',
		filename: 'us.csv',
		class: 'active',
		timeline: [
        	{value: '2007-08-01', class: 'timeline', text: 'Start of liquidity crisis'},
        	{value: '2008-09-01', class: 'timeline', text: 'Lehman Brother collapses'},
        	{value: '2009-02-01', class: 'timeline', text: 'Recovery Act enacted'},
        	{value: '2010-09-01', class: 'timeline', text: 'Small Business Job Act enacted'}
		],
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.'
	}, {
		name: 'Germany',
		shortcode: 'de',
		filename: 'germany.csv',
		class: null,
		timeline: [],
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.'
	}, {
		name: 'Japan',
		shortcode: 'jp',
		filename: 'japan.csv',
		class: null,
		timeline: [
			{value: '2008-11-17', class: 'timeline', text: 'Japan economy slides into recession'},
			{value: '2009-01-13', class: 'timeline', text: 'Japan experiencing a 42% drop in trade'},	
			{value: '2009-09-01', class: 'timeline', text: 'Employment Adjustment Subsidy Programme'},
		],
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.'
	}];
	$scope.selected = 0;

    // create a message to display in our view
    $scope.initChart = function() {
	    $scope.chart = c3.generate({
		    data: {
		        x: 'x',
				url: 'us.csv',
		        axes: {
		        	PeopleOpinion: 'y2',
		        	FutureOpinion: 'y2'
		        }
		    },
		    axis: {
		        x: {
		            type: 'timeseries',
		            tick: {
		                format: '%Y'
		            }
		        },
		        y: {
		        	label: {
		        	  	text: 'Percent (%)',
		          		position: 'outer-middle'
		       		}
		      	},
		      	y2: {
		      		show: true,
		      		label: {
		        	  	text: 'Percent of People (%)',
		          		position: 'outer-middle'
		       		}
		      	}
		    },
		    size: {
		        height: 480
		    },
		    point: {
		        show: false
		    },
		    grid: {
		        x: {
		            lines: [
		            	{value: '2007-08-01', class: 'timeline', text: 'Start of liquidity crisis'},
		            	{value: '2008-09-01', class: 'timeline', text: 'Lehman Brother collapses'},
		            	{value: '2009-02-01', class: 'timeline', text: 'Recovery Act enacted'},
		            	{value: '2010-09-01', class: 'timeline', text: 'Small Business Job Act enacted'}
		            ]
		        }
		    },
		    regions: [
		        {axis: 'y', start: -100, end: 0, class: 'negative-percentage'},
		        {axis: 'y', start: 0, class: 'positive-percentage'}
		    ],
		    tooltip: {
		        grouped: false, // Default true
		        format: {
		            title: d3.time.format('%Y'),
		            value: function(d) { return d + "%"; }
		//            value: d3.format(',') // apply this format to both y and y2
		        }
		    }
		});
	}

	$scope.loadChart = function(id) {
		$scope.chart.load({
			url: $scope.dataset[id].filename
		});
		$scope.chart.xgrids($scope.dataset[id].timeline);
		for (var i = 0; i < $scope.dataset.length; i++) {
			if (i == id) {
				$scope.dataset[i].class = 'active';
			} else {
				$scope.dataset[i].class = null;
			}
		};
		$scope.selected = id;
	}
});