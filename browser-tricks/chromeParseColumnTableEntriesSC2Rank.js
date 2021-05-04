
/* 
	####################################################################################
	# Tutor exercise
	####################################################################################
	If you were to to go a site with a table online, that was not easy to copy into excel to manipulate.
		You can use the DOM.
	Example: https://starcraft2.com/en-us/ladder/grandmaster/1
	The first column being an icon, where if you select an copy into excel, excel will embed icon images
	Default sorting doesn't work. 
	And you don't want to use VBA to have it figure that out.  
	
	You are wanting to count how many of each of those items there are.
	On the site, it's for showing changes in rank.  
	

	####################################################################################
	# Examples for more reading, clues to solve this without using the below.
	####################################################################################
		https://www.w3schools.com/jsref/jsref_obj_array.asp
		https://superuser.com/questions/316293/select-column-from-a-table-with-google-chrome
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
		https://stackoverflow.com/questions/31158902/is-it-possible-to-sort-a-es6-map-object
		https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
		https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
		https://developer.mozilla.org/en-US/docs/Web/API/Console/table
		https://medium.com/@iampika/part-6-javascript-functions-returning-functions-from-functions-429a3d9a55d1
*/

columnIndex=0
/* Return function to count how many unique of each element in array */
countUnique = () => (acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc );


/* Sort object of name propery, count property*/
sortUniqCount = (obj) => (
	Object.entries(obj).sort( (a,b) => b[1] - a[1] )
	.reduce( (_sortedObj, [k,v] ) => ({..._sortedObj, [k]:v} ), {} ) )

/*
	From: https://static.starcraft2.com/dist/images/icons/ladder/arrow-down.gif
	To:   /arrow-down.gif
	strAfter("https://static.starcraft2.com/dist/images/icons/ladder/arrow-down.gif", "/")
*/
strAfter = (s,c)=>{ let i=s.lastIndexOf(c); return i<0? i : s.substring(i) }

/* Going over 199 rankings, to count status markers*/


x=sortUniqCount(
	Array.from(document.getElementsByTagName('table')[0].getElementsByTagName('tr'))
	.map(tr => tr.getElementsByTagName('td'))
	.filter(td => td.length > 0) /*ignore empties*/
	.map(td => td[columnIndex]) /*Pick out column */
	.slice(1) /*skip header*/
	.map(cell => {  /*pull out icon info*/
		let c=cell.getElementsByTagName("img"); 
		return (c.length > 0 && typeof c[0] != undefined) ? strAfter(c[0].src, '/') : "hyphen"} )
	.reduce(countUnique (), {})) 

console.table(x)

/*
##############################
#  (index)          | Value  #
#----------------------------#
#  /exclamation.gif |   115  #
#  /arrow-up.gif    |    49  #
#  /arrow-down.gif  |    30  #
#  hyphen           |     4  #
##############################
*/

