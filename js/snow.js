var schemeColor,customColor,totalSnow  =50;
var colorSnow;

var icebear,posI,
	grizzly,posG,
	panda,posP;

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        // Show all user properties as string
        var jsonDebugElement = document.getElementById('UserJsonDebug');
        // jsonDebugElement.textContent = JSON.stringify(properties);

        // Read scheme color
        if (properties.schemecolor) {
           
            schemeColor = properties.schemecolor.value.split(' ');
            
            schemeColor = schemeColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            document.body.style.backgroundColor = 'rgb(' + schemeColor + ')';

        }

        // Read custom color
        if (properties.customcolor) {
            customColor = properties.customcolor.value.split(' ');
            
            customColor = customColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            // customDebugElement.style.backgroundColor = 'rgb(' + customColor + ')';
        	
        }

        
        // Read custom slider
        if (properties.customint) {
            
        	totalSnow = properties.customint.value ;
        	setup();
        }

       	if (properties.icebear) {
            // icebear = document.getElementById('BooleanTest');
            icebear  = properties.icebear.value;
            if (properties.icebear.value) {
                $('#ice-bear').show();
                
            } else {
                $('#ice-bear').hide();
            }
        }

        if (properties.icebearpos) {
            posI = properties.icebearpos.value;
            
            $('#ice-bear').css({left :posI+'%'});
        }  
        if (properties.grizzly) {
            grizzly  = properties.grizzly.value;
            if (properties.grizzly.value) {
                $('#grizzly').show();
                
            } else {
                $('#grizzly').hide();
            }
        }

        if (properties.grizzlypos) {
            posG = properties.grizzlypos.value;
            
            $('#grizzly').css({left :posG+'%'});
        }  
        if (properties.panda) {
            // icebear = document.getElementById('BooleanTest');
            panda  = properties.panda.value;
            if (properties.panda.value) {
                $('#panda').show();
                
            } else {
                $('#panda').hide();
            }
        }

        if (properties.pandapos) {
            posP = properties.pandapos.value;
            
            $('#panda').css({left :posP+'%'});
        }  

        if (properties.sizebear) {
        	let sizebear = properties.sizebear.value;

        	$("#ice-bear,#grizzly,#panda").css({width : sizebear+'vw'});
        }

    }
    
};





let canvas = document.getElementById("cvn");
let ctx = canvas.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var time = 0;


var snowflakes = [];



function frameCount() {
  return time;
} 

function setup(){
	snowflakes = [];

	for (let s = 0; s < totalSnow; s++) {
      snowflakes.push(new snowFlake());
    }
}

setup();

function draw(){
	

	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

    for (let flake of snowflakes) {
      

      

      flake.update();
      flake.show();
    }
	time++;
	
	requestAnimationFrame(draw);
}


function snowFlake(){
	this.randBetween = function(min, max) {
    	return min + Math.random() * (max - min);
  	}


	this.x = this.randBetween(0, w);
    this.y = this.randBetween(0, -h);
    this.vx = this.randBetween(-1, 1);
    this.vy = this.randBetween(0.1, 1);
    this.radius = this.randBetween(1, 4);
    this.alpha = this.randBetween(0.1, 0.9);
    this.windx = this.randBetween(-0.05,0.05);
    this.windy = this.randBetween(0.01,0.05);


    

    this.reset = function(){
    	this.x = this.randBetween(0, w);
	    this.y = this.randBetween(0, -h);
	    this.vx = this.randBetween(-1, 1);
	    this.vy = this.randBetween(0.1, 1);
	    this.radius = this.randBetween(1, 10);
	    this.alpha = this.randBetween(0.1, 0.9);
	    this.windx = this.randBetween(-0.05,0.05);
    	this.windy = this.randBetween(0.01,0.05);
    }

    this.update = function(){
    	if (frameCount()%20 ==0) {
    		this.vx+=this.windx;
    		this.vy+=this.windy;
    	}

	    this.x += this.vx;
	    this.y += this.vy;

	    if (this.y - this.radius > h || this.x + this.radius < 0 || this.x + this.radius > w) {
	      this.reset();
	    }
	  
    }

    this.show = function(){
      	ctx.save();
		ctx.fillStyle = 'rgb(' + customColor + ')';
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.closePath();
		ctx.globalAlpha = this.alpha;
		ctx.fill();
		ctx.restore();
    }

}

requestAnimationFrame(draw);