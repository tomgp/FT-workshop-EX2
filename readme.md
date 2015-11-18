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

###My first module

We're going to write some code and then turn it into a module.

At the moment the file `source/main.js` has some very simple code in it to load a CSV and creates a date formatter (which matches the format used in th data) using [D3's time formatter](https://github.com/mbostock/d3/wiki/Time-Formatting)

The data in question is a survey I made up where we imagined asking some people for the their opinion on something and then tallied up their imaginary answers , Yes or No, across various dates. Lets try and visualise this as a series of multiple small charts... 

First thing we need to do is sort out the data, the dates need to be proper dates not just strings and it would be useful to have the survey results as percentages. the easiest way to do the same thing to each element of an array is to use [Javascript's map function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

how about something like ...

```
var processedData = data.map(function(d){
	var dateFormat = d3.time.format('%Y-%m-%d');
	var total = Number( d.yes ) + Number( d.no );
	return {
		date: dateFormat.parse( d.date ),
		yes: Number( d.yes ),
		no: Number( d.no ),
		total: total,
		yesPct: 100/ total * Number( d.yes ),
		noPct: 100/ total * Number( d.no )
	};
});

```

####BRANCH : process-data

The good thing about using `map` rather than a comventional `for` loop is that it's easier to see that the function has no side effects, it takes an input and returns an output but nothing outside the function is changed. This makes it easier to think about the function spearately from the surrounding program. 

It's definately worth familiarising yourself with javascript's built in array functions [here's a page which lists them](https://github.com/mbostock/d3/wiki/Arrays).

So that's our code for processing the data -- in real world examples you may be doing somethign more complex but for our purposes this is fine.

Because the thing that does the data processing is a function with (we hope) no side effects we can easily take it out from its current place. 

Lets do it in stages so that we can see what's happening

First lets turn the anonymous function used in the map into a named function

```
var processedData = data.map(processElement);

function processElement(d){
	...
}
```

So now we have a function called process element let's put that in a new file. Make a new file in the same directory as _main.js_ called something sensible like _data-processing.js_ cut the `processElement` function from _main.js_ and paste it in there. 

At this point your browser console will (I hope) give an error as ```processElement``` is no longer defined as far as _main.js_ is concerned.

There are a couple of things we need to do to fix this state of affairs.

We need to make _data-processing.js_ make  the `processElement` function available to the outside world. THis is done as follows:

```
function processElement(d){
	...
}

module.exports = processElement;
```

Then in _main.js_ we need to specify that this file is a dependency

```
var processElement = require('./data-processing.js');
```

But wait! We're getting a different error now. This is because the function we made isn't as nicely isolated from the world outside as I tried to make you think it was. Because of the date processing D3 is a dependency of _data-processing.js_. There are a couple of ways to fix this the easiest being simply to require D3 inside _data-processing.js_. 

```
var d3 = require('d3')
```

Otherwise we could a) inline or rewrite the bit of code we are using from d3 might be worth it if we expect this may be used in a d3-less context or b) use a technique called dependency injection where we give the modules user a mechanism by which they can pass a date parser of their own creation into the function (that's a bit beyond what I'm hoping to explain here though)

####BRANCH : make-a-module

OK, now lets skip some basic drawing stuff so switch to

####BRANCH : draw-some-stuff

and we'll go from there.

###Using 'call'

If you want to add multiple nodes to a particular parent e.g. a _text_ label and a _rect_ angle to a _g_roup you might typically store the selection chain at a particular point to a variable and then continue adding stuff to that variable, something like this:

```
var parent = d3.select('svg').selectAll('g').data(data)
	.enter()
		.append('g')

parent.append('text')
	...

parent.append('rect')
	...

```

this is nice andeasy and perfectly fine for simple situations but it deosn't allow for easy code reuse; say the visualisation you're adding to the group needs to be repeated in otehr contexts, you might be able to encapulate it as a function -- something that took the parent selection as an argument and returns the current selection.

the function might look something like this

```

function( parent ){
	parent.append('text')
		...

	parent.append('rect')
		...
}

```

luckily D3's selection has a method ```call``` which allows you to do exactly this

i.e.

```
d3.select('svg').selectAll('g').data(data)
	.enter()
		.append('g')
	.call(function( parent ){
		parent.append('text')
			...

		parent.append('rect')
			...
	});
```


#### branch: 'using-call'

Personally, in-spite of it's other advantages, I think this code is less readable than the simple approach we took first time around but we can make it much better by extracting the currently anonymous _call_ed function. Like this:

```
d3.select('svg').selectAll('g').data(data)
	.enter()
		.append('g')
	.call(drawVisualisation);

function drawVisualisation( parent ){
	parent.append('text')
		...

	parent.append('rect')
		...
}
```

doing this lets us consider the function as a 'black box'; we know what inputs it takes and what outputs it gives back so the actual process of visualisation can be thought about separately. We might decide later in the project that that we want to use two labels and a circle or anything else, it's fine.

#### branch: 'extract-call-function'

#### branch:'using-each'
use each to render different cuts of the same data on the page 

