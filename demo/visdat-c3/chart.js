var chart = c3.generate({
    data: {
        url: 'dataset.csv',	
        xs: {
        	Asia: 'asia_mcd',
        	SouthAmerica: 'sthAm_mcd',
        	Africa: 'africa_mcd',
        	Europe: 'europe_mcd',
        	UnitedStates: 'us_mcd',
        	Australia: 'aus_mcd'
        },
        type: 'scatter'
    },
    axis: {
        x: {
            label: 'McDonalds Price',
            tick: {
            	format: d3.format("$,"),
                fit: false
            }
        },
        y: {
            label: 'Local Meal Price',
	        tick: {
	          format: d3.format("$,") // ADD
	        }
        }
    },
    zoom: {
        enabled: true
    },
    point: {
    	r: 5
    },
    legend: {
	  	hide: 'normal'
	}
});

setTimeout(function () {
    chart.load({
        xs: {
        	normal: 'normal_x'
        },
        columns: [
    		['normal', 3, 9],
    		['normal_x', 3, 9]
    	],
        types: {
        	normal: 'line'
        }
    });
}, 1000);