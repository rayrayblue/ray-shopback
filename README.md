# ray-shopback
Input should be a HTML file, the result will print in the console.

Installation
=====
```Bash
npm install ray-shopback
```
Use Case:
=====

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
=====
1. 
```Bash
npm install ray-shopback
```
2.
You could use above 5 methods to chain any rule you need.

3.
I define two flex method fot this requiement:

Method 1
-----
```Javascript
module.exports.flexCheckTagNumLimit = function (content, tag, limit){
    var result = checkTagNumLimit(content, tag, limit);
    if(!result){
        outputFormatForCheckTagNum(tag, limit);
    }
};
```
Example: If I want to detect if there have more than 50 img tag...

```Javascript
flexCheckTagNumLimit('./test.html', 'img', 50)
```


Method 2:
-----
```Javascript
module.exports.flexCheckNumOfTagWithoutAttr = function (content, tag, attr) {
    var num = getNumOfTagWithoutAttr(content, tag, attr);
    if(num > 0){
        outputFormatForCheckAttr(tag, attr, num);
    }
};
```
Example: If I want to detect any img without id attr...
```Javascript
flexCheckNumOfTagWithoutAttr('./test.html', 'img', 'id')
```

6. 
If you want to add more rule for meta tag, you could simply modify the list in line 22 index.js file.
```JavaScript
metaNameList = ['descriptions', 'keywords'];
```
Example: If I want to check name='robots' is exist or not...

```JavaScript
metaNameList = ['descriptions', 'keywords', 'robots'];
```

