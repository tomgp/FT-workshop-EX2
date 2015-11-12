Second exercise for a D3 workshop running at the Financial Times

 * __Prerequisit:__ Some Javascript, some D3 (selections, )
 * __Outcome:__ After doing this excercise you should an idea about making javascript modules to keep your code in manageable chunks.
 * __Outcome:__ Also you'll appreciate the benefits of D3 selections `call` and `each` methods
 
---

##Modules
Modules are a way of splitting code into different files which are self sufficient and resuable. They help to keep your main program files clear of distratcion so it's easier for you to think about the overall structure of your programs. Javascript doesn't support this kind fo thing in the browser right now but there are tools which will allow you to write your javascript in separate files and then pulls them all together. In the tintreractive team we use [browserify](http://browserify.org/) which mirrors the syntax of Nodejs modules. So for example if you want to use D3 in you a can type...

```
var d3 = require(d3);
```

And (providing that module is installed) it can be included in your code.

This repository has a basic build script set up to do this process for you -- it's like a cut down version of our [project starter kit](https://github.com/ft-interactive/project-starter-kit). So: 

 * clone this repository from GitHub. [Here it is](https://github.com/tomgp/FT-workshop-EX2)  
 * go to the directory into which you cloned it and type `npm install`. This will make available various dependencies (like the aforementioned 'browserify') 
 * type `npm run watch` to start a development server and rebuild your javascript on the fly

Right. You may notice the repository you just cloned has several branches. These are completed steps of the excercise so if you go off track you can get back on track fairly easily by just switching to the appropriate branch. Or if you want you can just skip straight to the branch and mess around with the code to see what happens.

##My first module

At the moment the file `source/main.js` has some very simple code in it to load a CSV and creates a date formatter (which matches the format used in th data) using [D3's time formatter](https://github.com/mbostock/d3/wiki/Time-Formatting)

branch: 'make-a-module'

branch: 'draw-some-stuff'

###Using 'call'

1 branch: 'using-call'
use 'call' to neatly add more than one node to a parrent 
	
2 branch: 'extract-call-function'
abstract the resulting function 

###Using 'each'

1 branch:'using-each'
use each to render different cuts of the same data on the page 
