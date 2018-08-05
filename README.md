# ray-shopback
Input should be a HTML file, the result will print in the console.

Installation
```Bash
npm install ray-shopback
```
Use Case:

Rule 1
```Node.js
ray-shopback.checkNumOfImgtagWithoutAlt('./test.html');
```

Rule 2
```Node.js
ray-shopback.checkNumOfAtagWithoutRel('./test.html');
```

Rule 3
```Node.js
ray-shopback.checkHeadTag('./test.html');
```

Rule 4
```Node.js
ray-shopback.checkStrongNumLimit('./test.html', 15);
```

Rule 5
```Node.js
ray-shopback.checkH1tagNumLimit('./test.html');
```
Development Requiement

1. 
```Bash
npm install ray-shopback
```
2.
You could use above 5 methods to chain any rule you need.
3.
I define two flex method fot this requiement:
```Javascript
module.exports.flexCheckTagNumLimit = function (content, tag, limit){
    var result = checkTagNumLimit(content, tag, limit);
    if(!result){
        outputFormatForCheckTagNum(tag, limit);
    }
};
```
