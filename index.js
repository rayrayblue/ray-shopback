var cheerio = require('cheerio');
var fs = require('fs');

//Rule 1
module.exports.checkNumOfImgtagWithoutAlt = function (content) {
    var num = getNumOfTagWithoutAttr(content, 'img', 'alt');
    if(num > 0){
        outputFormatForCheckAttr('img', 'alt', num);
    }
};

//Rule 2
module.exports.checkNumOfAtagWithoutRel = function (content) {
    var num = getNumOfTagWithoutAttr(content, 'a', 'rel');
    if(num > 0){
        outputFormatForCheckAttr('a', 'rel', num);
    }
};

//Rule 3
module.exports.checkHeadTag = function(content) {
    metaNameList = ['descriptions', 'keywords'];
    var $ = cheerio.load(fs.readFileSync(content));
    var titleLen = $('head').find('title').length;
    var metaList = $('head').find('meta');
    
    if(titleLen == 0){
        outputFormatForHeadTagChecking('title')
    }

    for (var i = metaNameList.length - 1; i >= 0; i--) {
        var notExist = true
        for (var j = metaList.length - 1; j >= 0; j--) {
            if($(metaList[j]).attr('name') == metaNameList[i]){
                console.log('qqqq')
                notExist = false
            }
        }

        if(notExist){
            outputFormatForHeadTagChecking(metaNameList[i]);
        }
    }
};

//Rule 4
module.exports.checkStrongNumLimit = function (content, limit) {
    var result = checkTagNumLimit(content, 'strong', limit);
    if(!result){
        outputFormatForCheckTagNum('strong', limit);
    }
};

//Rule 5
module.exports.checkH1tagNumLimit = function (content) {
    var result = checkTagNumLimit(content, 'H1', 1);
    if(!result){
        outputFormatForCheckTagNum('H1', 1);
    }
};

module.exports.flexCheckTagNumLimit = function (content, tag, limit){
    var result = checkTagNumLimit(content, tag, limit);
    if(!result){
        outputFormatForCheckTagNum(tag, limit);
    }
};

module.exports.flexCheckNumOfTagWithoutAttr = function (content, tag, attr) {
    var num = getNumOfTagWithoutAttr(content, tag, attr);
    if(num > 0){
        outputFormatForCheckAttr(tag, attr, num);
    }
};

function checkTagNumLimit(content, tag, limit){
    var num = getNumOfTag(content, tag);
    if(num > limit){
        return false;
    }else{
        return true;
    }
}

function getNumOfTagWithoutAttr(content, tag, attr){
    var $ = cheerio.load(fs.readFileSync(content));
    // console.info($('body').find('a').length);
    var tagList = $('html').find(tag);
    var num = 0;
    tagList.each(function(item) {
        var cap = $(this);
        if(!cap.attr(attr)){
            num += 1;
        }
        // console.info(cap.attr(attr));
    });
    console.info(num);
    return num;
}

function getNumOfTag(content, tag){
    var $ = cheerio.load(fs.readFileSync(content));
    var num = $('html').find(tag).length;
    return num;
}

function outputFormatForCheckAttr(tag, attr, num){
    var be = 'are';
    if(num == 1){
        be = 'is'
    }

    console.info('There ' + be + ' ' + num + ' <' + tag + '> ' + 'tag without ' + attr + ' attribute.');
}

function outputFormatForCheckTagNum(tag, limit){
    console.info('This HTML have more than ' + limit + ' <' + tag + '> tag.');
}

function outputFormatForHeadTagChecking(tag){
    if(tag != 'title'){
        tag = '<meta name="' + tag + '".../>';
    }
    console.info('This HTML without ' + tag + ' tag.');
}
