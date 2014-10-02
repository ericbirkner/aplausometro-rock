//Eric Birkner Js

var deviceArray = air.Microphone.names; 
var ganancia = 100; 
var play = true;



air.trace("Available sound input devices:"); 
for (i = 0; i < deviceArray.length; i++) 
{ 
    air.trace("   " + deviceArray[i]); 
} 
 
var mic = air.Microphone.getMicrophone(); 
mic.gain = ganancia; 
mic.rate = 11; 

mic.setUseEchoSuppression(true); 
mic.setLoopBack(true); 
mic.setSilenceLevel(5, 100); 
    
mic.addEventListener(air.ActivityEvent.ACTIVITY, this.onMicActivity); 
     
var micDetails = "Sound input device name: " + mic.name + '\n'; 
micDetails += "Gain: " + mic.gain + '\n'; 
micDetails += "Rate: " + mic.rate + " kHz" + '\n'; 
micDetails += "Muted: " + mic.muted + '\n'; 
micDetails += "Silence level: " + mic.silenceLevel + '\n'; 
micDetails += "Silence timeout: " + mic.silenceTimeout + '\n'; 
micDetails += "Echo suppression: " + mic.useEchoSuppression + '\n'; 
air.trace(micDetails); 
 
function onMicActivity(event) 
{ 
    air.trace("activating=" + event.activating + ", activityLevel=" +  
        mic.activityLevel); 
		$('#test').text(mic.activityLevel);
		barra(mic.activityLevel);
}

//funcion barra
function barra(valor){
	if(play){
		valor = parseInt(valor);
		valor = valor * 1;
		var opacidad = valor / 100;
		
		if(valor > 98){
			end();
		}else{
		
			$('#barra .color').css('height',valor+'%');
			$('#demo img, #guitarra .light').css('opacity',opacidad);
			console.log('valor:'+valor);	
			console.log('opacidad:'+opacidad);
		}
		
	}
}

function begin(){
	console.log('begin');
	$('#demo').removeClass('ani');
	$('#guitarra .light').removeClass('ani');
	play = true;
}


function end(){
	//console.log(end);
	play = false;
	$('#barra .color').css('height','100%');
	$('#demo').addClass('ani');
	$('#demo img, #guitarra .light').css('opacity','1');
	$('#guitarra .light').addClass('ani');
	
	setTimeout(function(){
		begin();
	},5000);
	//$('#demo').lazylinepainter('paint');

}


$(document).ready(function(){
	$("[data-slider]")
    .each(function () {
      var input = $(this);
      $("<span>")
        .addClass("output")
        .insertAfter($(this));
    })
    .bind("slider:ready slider:changed", function (event, data) {
      $(this)
        .nextAll(".output:first")
          .html(data.value.toFixed(0));
		  ganancia = data.value.toFixed(0);
    });
	
	$('#demo').on('click',function(){
		end();
	});
	
	$('#config').on('click',function(){
		$('#setup').fadeIn('fast');
	});
	
	$('#cerrar').on('click',function(){
		applicationExit();
	});
	
	$('#setup .ok').on('click',function(){
		ganancia = $('.ganancia').val();
		//console.log(gente);
		$(this).parent().fadeOut('fast');
	});
	
	$('#guitarra').on('mousedown',function(){
		 nativeWindow.startMove(); 
    });
	
});

function applicationExit(){ 
    var exitingEvent = new air.Event(air.Event.EXITING, false, true); 
    air.NativeApplication.nativeApplication.dispatchEvent(exitingEvent); 
    if (!exitingEvent.isDefaultPrevented()) { 
        air.NativeApplication.nativeApplication.exit(); 
    } 
}