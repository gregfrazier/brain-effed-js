// Usage: runBFCode() -- Interprets and returns the display of the BrainF*ck Program		  
// (c) 2010 Greg Frazier; gregfrazier@gmail.com -- MIT License
function brainEffed(code){
	var a = [],     // 30,000 Bytes Available
	    x = 0,      // Pointer
	    f = 0,      // 'File' Pointer
	    disp = [],
	toStringFromArray = function(){
		var arr = arguments[0], y = "";
		for(var x = 0; x < arr.length; y += arr[x++]);
		return y;
	},
	findWhileLoop = function(wcode, start){
	   var loopStack = [], y;
	   for(y = start; y < wcode.length; y++)
		   if(wcode.charAt(y) == ']' && loopStack.pop() === undefined)
				return y;
		   else if(wcode.charAt(y) == '[')
			   loopStack.push('1');
	   return y;
	},
	parser = function(code, a, x, disp, f){
	   while(f < code.length){
		   switch (code.charAt(f)){
			   case '>':	++x; break;
			   case '<':	--x; break;
			   case '+':	a[x] = a[x] === undefined ? 0 : a[x]; a[x]++; break;
			   case '-':	a[x] = a[x] === undefined ? 0 : a[x]; a[x]--; break;
			   case '.':	disp.push(String.fromCharCode(a[x])); break;
			   case ',':	var inText = prompt("Enter a Single Value:", "");
							a[x] = (inText == null) ? 10 : inText.charCodeAt(0);
							break;
			   case '[':	var endWhile = findWhileLoop(code, f+1);
							a[x] = (a[x] === undefined) ? 0 : a[x];
							x = (a[x] != 0) ? parser(code.substring(f+1,endWhile+1), a, x, disp, 0) : x;
							f = endWhile;
							break;
			   case ']':	a[x] = (a[x] === undefined) ? 0 : a[x];
							f = (a[x] != 0) ? -1 : code.length;
							break;
		   }
		   f++;
	   }
	   return x;
	};
	parser(code, a, x, disp, f);
	return toStringFromArray(disp);
}
