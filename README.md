# avatar icon generator

A simple avatar generator script for Node.js.  

![avatar-icon-1](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-1.png)
![avatar-icon-2](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-2.png)
![avatar-icon-3](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-3.png)
![avatar-icon-4](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-4.png)  

![avatar-icon-5](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-5.png)
![avatar-icon-6](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-6.png)
![avatar-icon-7](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-7.png)
![avatar-icon-8](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-8.png)  

![avatar-icon-9](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-9.png)
![avatar-icon-10](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-10.png)
![avatar-icon-11](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-11.png)
![avatar-icon-12](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-12.png)

![avatar-icon-13](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-13.png)
![avatar-icon-14](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-14.png)
![avatar-icon-15](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-15.png)
![avatar-icon-16](https://raw.githubusercontent.com/ztomm/avatar-icon/master/sample-icons/avatar-icon-16.png)

## install and usage

````bash
npm i avatar-icon
````

**dataURL**
````javascript
const avatarIcon = require('avatar-icon');

let dataURL = avatarIcon();

// <img src={{dataURL}} alt="">
````

**image file**

````javascript
const avatarIcon = require('avatar-icon');
const fs = require('fs');

let buffer = avatarIcon({
	returnType: 'buffer'
});

fs.writeFileSync(`./icon.png`, buffer);

````

## options and defaults

````javascript
let icon = avatarIcon({
	size            : 72,   // px
	density         : 10,    // max amount of shapes in one row
	colorRange      : 12,   // amount of different colors
	brightness      : 40,   // make it bright: start at 40 from 255 colors
	contrast        : 50,   // %, take similar colors
	backgroundColor : '',   // #hex or empty
	fillRatio       : 60,   // %, some white space
	rectangleRatio  : 60,   // %, ratio of rectangles
	triangleRatio   : 40,   // %, ratio of triangles
	circleRatio     : 0,    // %, ratio of circles
	returnType      : '',   // default dataURL || 'buffer'
});

````
