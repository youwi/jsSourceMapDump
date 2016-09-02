



var mapjson=[];
var fs = require("fs");
var path = require('path');




if(process.argv.length<3)
    mapjson=require("app.js.map.json");
else
    mapjson=require(process.argv[2]);




//使用时第二个参数可以忽略
function mkdir(dirpath,dirname){
    //判断是否是第一次调用
    if(dirpath==".") return;
    if(dirpath=="") return;
    if(typeof dirname === "undefined"){
        if(fs.existsSync(dirpath)){
            return;
        }else{
            mkdir(dirpath,path.dirname(dirpath));
        }
    }else{
        //判断第二个参数是否正常，避免调用时传入错误参数
        if(dirname !== path.dirname(dirpath)){
            mkdir(dirpath);
            return;
        }
        if(fs.existsSync(dirname)){
            fs.mkdirSync(dirpath)
        }else{
            mkdir(dirname,path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}
mapjson.sources.map(function(item,i){

    var dirname=item.replace("webpack:///","");
    dirname=dirname.replace("webpack://","");
    dirname=dirname.replace("\/.\/","");
    dirname=dirname.replace("~\/","");
    var filename=dirname;
    var dirarray= dirname.replace("webpack://","").replace("/./","").split("/");
    dirarray.pop();
    dirname= dirarray.join("/");
    mkdir(dirname);
    try{
        fs.writeFileSync(filename,mapjson.sourcesContent[i]);
    }catch (e){
        console.log(e);
    }


});




