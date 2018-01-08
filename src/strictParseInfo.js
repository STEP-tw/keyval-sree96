const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key) {
  return list.find(function(validKey){
    return key==validKey;
  });
}

const insensitiveContains=function(list,key) {
  return list.find(function(validKey){
    return key.toLowerCase()==validKey.toLowerCase();
  });
}

var StrictParseInfo=function(initialParsingFunction,validKeys,caseSensitiveness) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
  this.caseSensitiveness=caseSensitiveness;
}



StrictParseInfo.prototype=Object.create(ParseInfo.prototype);

StrictParseInfo.prototype.parseCaseSensitive = function () {
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
};

StrictParseInfo.prototype.pushKeyValuePair=function() {
  if(!contains(this.validKeys,this.currentKey)){
    if (this.caseSensitiveness==false&&insensitiveContains(this.validKeys,this.currentKey)) {
      this.parseCaseSensitive();
      return ;
    }
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  }
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}



module.exports=StrictParseInfo;
