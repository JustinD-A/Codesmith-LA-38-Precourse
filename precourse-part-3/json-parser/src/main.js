/**
 * returns a javascript object from a JSON formatted string
 * Example json to javascript object:
 *   "5"          -> 5
 *   "'hello'"   -> 'hello'
 *   "[]"         -> []
 *   "{}"         -> {}
 *   "["hello"]"  -> ['hello']
 *
 *  For more examples, use the JSON.stringify method in the console
 */

function JSONParser (string) {
	let newObj;


	/* Case if it's a string */
	if (string[0] == `"` || string[0] == `'`) {
		newObj = eval(string);
	}


	/* Case if it's a number */
	else if (!isNaN(string[0])) {
		newObj = eval(string);
	}


	/* case  if it's boolean */
	else if (string == "true") {
		newObj = true;
	} else if (string == "false") {
		newObj = false;
	}


	/* Case if it's an array */
	else if (string[0] == `[`) {
		/* We've figured out it's an array, so we can tell JS that */
		newObj = [];

		/* We need to parse through the string, splitting around commas so long as we are only one layer deep in braces */
		let bracesCounter = 0; /* a counter to make sure we are only one layer deep in braces */
		let lastSnipIndex = 1; /* a counter to remember where to snip */

		for (let i = 0; i < string.length; i++) {
			if (string[i] == `{` || string[i] == `[`) {
				bracesCounter++;
			} else if (string[i] == `}` || string[i] == `]`) {
				if (i == string.length-1 && i != 1) { /* we need the second conditional for the trivial case that the object being parsed is property-less */
					newObj.push(string.substring(lastSnipIndex, i));
				}
				bracesCounter--;
			} else if ((string[i] == `,`) && (bracesCounter == 1)) {
				newObj.push(string.substring(lastSnipIndex, i));
				lastSnipIndex = i+1;
			} 
		}
		
		/* We need to recursively figure out the type of each element of the capture array and replace with the correct object */
		for (let i = 0; i < newObj.length; i++) {
			newObj[i] = JSONParser(newObj[i]);
		}
	}


	/* Case if it's an object */
	else if (string[0] == `{`) {
		/* We've figured out it's an object, so we can tell JS that */
		newObj = {};

		/* We need to parse through the string, splitting around commas so long as we are only one layer deep in braces */
		let keyValueArray = []; /* a place to push key-value pairs */
		let bracesCounter = 0; /* a counter to make sure we are only one layer deep in braces */
		let lastSnipIndex = 1; /* a counter to remember where to snip */

		for (let i = 0; i < string.length; i++) {
			if (string[i] == `{` || string[i] == `[`) {
				bracesCounter++;
			} else if (string[i] == `}` || string[i] == `]`) {
				if (i == string.length-1 && i != 1) { /* we need the second conditional for the trivial case that the object being parsed is property-less */
					keyValueArray.push(string.substring(lastSnipIndex, i));
				}
				bracesCounter--;
			} else if ((string[i] == `,`) && (bracesCounter == 1)) {
				keyValueArray.push(string.substring(lastSnipIndex, i));
				lastSnipIndex = i+1;
			} 
		}

		/* We need to split the key-value pairs into keys and values */
		for (let el of keyValueArray) {
			let elKey = el.substring(0,el.indexOf(':'));
			let elValue = el.substring(el.indexOf(':')+1, el.length);
			/* Then we need to figure out the type of each value recursively calling the parser */
			/* And we reconstruct the object */
			newObj[JSONParser(elKey)] = JSONParser(elValue);
		}
	}


	/* Otherwise, assume it's null */
	else {
		newObj = null;
	}


	return newObj;
}





