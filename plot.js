	$(function() {

		// We use an inline data source in the example, usually data would
		// be fetched from a server

    var coreId = '54ff6f066678574925591067';
    // var spark = require('spark');
    spark.login({username: 'birol_senturk@brown.edu', password: '145236'}, function(err){
      if (err) {
        
      }
      else {
        var data = [],
    			totalPoints = 300;
    
    		function getRandomData() {
    
    			if (data.length > 0)
    				data = data.slice(1);
    
    			// Do a random walk
    
    			while (data.length < totalPoints) {
    
    				//y = Math.random()*100;
    
            spark.getDevice(coreId, function(err, device) {
              device.getVariable('temperature', function(err, a) {
                if (err) {
                  //console.log('An error occurred while getting attrs:', err);
                  y = 40.0;
                  
                } else {
                  //console.log(data["result"] + ", " + data["coreInfo"]["last_heard"]);
                  // console.log(", ");
                  // console.log(data["coreInfo"]["last_heard"]);
                  y = 60.0;
                }
              });
              y = 80.0;
            });
    
    				data.push(y);
    			}
    
    			// Zip the generated y values with the x values
    
    			var res = [];
    			for (var i = 0; i < data.length; ++i) {
    				res.push([i, data[i]])
    			}
    
    			return res;
    		}
    
    		// Set up the control widget
    
    		var updateInterval = 30;
    		$("#updateInterval").val(updateInterval).change(function () {
    			var v = $(this).val();
    			if (v && !isNaN(+v)) {
    				updateInterval = +v;
    				if (updateInterval < 1) {
    					updateInterval = 1;
    				} else if (updateInterval > 2000) {
    					updateInterval = 2000;
    				}
    				$(this).val("" + updateInterval);
    			}
    		});
    
    		var plot = $.plot("#placeholder", [ getRandomData() ], {
    			series: {
    				shadowSize: 0	// Drawing is faster without shadows
    			},
    			yaxis: {
    				min: 0,
    				max: 100
    			},
    			xaxis: {
    				show: false
    			}
    		});
    
    		function update() {
    
    			plot.setData([getRandomData()]);
    
    			// Since the axes don't change, we don't need to call plot.setupGrid()
    
    			plot.draw();
    			setTimeout(update, updateInterval);
    		}
    
    		update();
    
    		// Add the Flot version string to the footer
    
    		$("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
      }
    });
	});