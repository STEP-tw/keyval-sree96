const src=function(filePath){return "../src/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;

describe("strict parser that is case insensitive",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified keys are in lower case and actual is not for multiple keys also",function(){
    let kvParser=new StrictParser(["name","age","AGS"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    expected["aGs"]="38";
    expected["aGE"]="38";
    let parsed=kvParser.parse("NAME=jayanth aGE=38 aGs=38");
    assert.deepEqual(parsed,expected);
  });
});

describe("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
  });

  it("should throw error when specified keys are in lower case and actual is not with trailing spaces",function(){
    let kvParser=new StrictParser(["name"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse(" NAME=jayanth");
    })
  });
});
