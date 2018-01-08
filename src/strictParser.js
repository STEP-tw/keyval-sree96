const Parser=require("./keyValueParser.js");
const strictParseInfoCreator=require("./parseInfoCreator.js").strict;

var StrictParser=function(listOfKeys,isCaseSensitive=true) {
  Parser.call(this);
  let sanitisedListOfKeys=listOfKeys||[];
  let caseSensitiveness=isCaseSensitive;
  this.parseInfoCreator=strictParseInfoCreator(sanitisedListOfKeys,caseSensitiveness);
}

StrictParser.prototype=Object.create(Parser.prototype);
module.exports=StrictParser;
