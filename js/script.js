jQuery(document).ready(function(){
  //if there is a load_lesson function attached to this page
  if(window.hasOwnProperty('load_lesson')){
    //load the lesson
    load_lesson();
  }
  //==LOAD SVG IMAGES==
  loadSvg();
});
//gets the contents of a function, eg: function functionName(){/* ...contents... */}
function getFuncStr(functionName){
	var functionContent = '';
	//if this function exists
	if(window.hasOwnProperty(functionName)){
		//get code inside the function object
		functionContent = window[functionName];
		functionContent = functionContent.toString();
		//strip off the function string
		var startCode = '{/*';var endCode = '*/}';
		//safari tries to be helpful by inserting a ';' at the end of the function code if there is not already a ';'
		if (functionContent.lastIndexOf(endCode) == -1) {endCode='*/;}';}
		//strip off everything left of, and including startCode
		functionContent = functionContent.substring(functionContent.indexOf(startCode) + startCode.length);
		//strip off everything right of, and including endCode
		functionContent = functionContent.substring(0, functionContent.lastIndexOf(endCode));
		functionContent = functionContent.trim();
	}
	return functionContent;
}
function getSvg(svgName){return getFuncStr('svg_'+svgName);}
function loadSvg(){
  //get the unloaded svg images
  var bodyElem=jQuery('body:first');
  var svgWraps=bodyElem.find('[svg]').not('.load-svg');
  svgWraps.each(function(){
    //indicate this svg is loaded
    var svgWrap=jQuery(this);
    svgWrap.addClass('load-svg');
    //get the name of the svg
    var svgName=svgWrap.attr('svg');
    //if this svg name has XML
    var svgXml=getSvg(svgName);
    if(svgXml!=undefined&&svgXml.length>0){
      //append this html to the svgWrap
      svgWrap.html(svgXml);
      svgWrap.addClass('has-svg');
    }else{
      //there is no svg XML for this given name
      svgWrap.addClass('no-svg');
    }
  });
}
function getCards(cardType){
  var html='';
  if(cardType!=undefined){
    //for each locale
    var user_locales=getConfig().user_locales;
    for(var u=0;u<user_locales.length;u++){
      var locale=user_locales[u];
      //if the data for this local and card type exists
      if(window.hasOwnProperty(locale+'_'+cardType)){
        //get the json for this locale/card type
        var cardJson=window[locale+'_'+cardType]();
        //if this card type has keys
        if(cardJson.hasOwnProperty('keys')){
          //if there is also info for these keys
          if(cardJson.hasOwnProperty('info')){
            //for each key
            for(var k=0;k<cardJson.keys.length;k++){
              //if this key index exists
              var keyStr=(k+1)+'';
              if(cardJson.info.hasOwnProperty(keyStr)){
                //get the info for this key
                var infoJson=cardJson.info[keyStr];
                //*** based on getConfig().user_locales, attach the grammar.js files to the pages
              }
            }
          }
        }
      }
    }
  }
  return html;
}
