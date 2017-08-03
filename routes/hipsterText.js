var express = require('express');
var router = express.Router();
var injectText = require('../snippets');
function getRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}


router.post('/', function(req, res, next) {
  var newText = "";
  function hipText(){
  var inputText = req.body.text;
  var textArray = inputText.split(" ");
  for (var i = 0; i < textArray.length; i++){
    var randomWord = injectText[getRandom(1, injectText.length)]
    newText +=  textArray[i] + " " + randomWord + " "

    }
    return newText;
  };
  res.send(hipText(req.body.text));
});


module.exports = router;
