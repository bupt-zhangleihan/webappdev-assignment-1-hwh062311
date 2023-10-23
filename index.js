const quotes = [
	'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
	'There is nothing more deceptive than an obvious fact.',
	'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
	'I never make exceptions. An exception disproves the rule.',
	'What one man can invent another can discover.',
	'Nothing clears up a case so much as stating it to another person.',
	'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// array for storing the words of the current challenge
let words = [];
// stores the index of the word the player is currently typing
let wordIndex = 0;
// default value for startTime (will be set on start)
let startTime = Date.now();
//在事件处理函数中检查某个标志变量或条件，并根据其值来确定是否执行事件处理代码

let isEventEnabled = true
let quotelen=quotes.length
//将句子索引设置为全局变量
let quoteIndex=0
//定义每个句子最高分的列表，初始为0
const maxlist=[]
for (let i=0;i<quotelen;i++){
	maxlist.push(0)
}
// grab UI items
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message')
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', function () {
	// get a quote
	quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];
	//启动start事件时，更新isEventEnabled值为true
	isEventEnabled = true
	
	// Put the quote into an array of words
	words = quote.split(' ');
	// reset the word index for tracking
	wordIndex = 0;

	// UI updates
	// Create an array of span elements so we can set a class
	const spanWords = words.map(function(word) { return `<span>${word} </span>`});
	// Convert into string and set as innerHTML on quote display
	quoteElement.innerHTML = spanWords.join('');
	// Highlight the first word
	quoteElement.childNodes[0].className = 'highlight';
	// Clear any prior messages
	messageElement.innerText = '';
	// Setup the textbox
	//开始时显示输入框
	typedValueElement.style.visibility="visible";
	// Clear the textbox
	typedValueElement.value = '';
	// set focus
	typedValueElement.focus();
	// set the event handler

	// Start the timer
	startTime = new Date().getTime();
});



typedValueElement.addEventListener('input', (e) => {
	// Get the current word
	const currentWord = words[wordIndex];
	// get the current value
	const typedValue = typedValueElement.value;
	//当变量isEventEnabled为false时，禁用input事件监听器
	if(isEventEnabled){
		if (typedValue === currentWord && wordIndex === words.length - 1) {
		// end of quote
		// Display success
			const elapsedTime = new Date().getTime() - startTime;
			//根据最新得分更新最高分
			if (elapsedTime<maxlist[quoteIndex]||maxlist[quoteIndex]===0){
				maxlist[quoteIndex]=elapsedTime
			}
			const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.The fastest speed is ${maxlist[quoteIndex]/1000} seconds`;
			//成功后显示对话框，css中设置为none，
			messageElement.style.display="block";
			messageElement.innerHTML = message;
			//完成后隐藏输入框
			typedValueElement.style.visibility = "hidden";
			isEventEnabled=false;
			
		}
	 	else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		// end of word
		// clear the typedValueElement for the new word
			typedValueElement.value = '';
		// move to the next word
			wordIndex++;
		// reset the class name for all elements in quote
			for (const wordElement of quoteElement.childNodes) {
				wordElement.className = '';
			}
		// highlight the new word
			quoteElement.childNodes[wordIndex].className = 'highlight';}
	 	else if (currentWord.startsWith(typedValue)) {
		// currently correct
		// highlight the next word
			typedValueElement.className = '';}
	 	else {
		// error state
			typedValueElement.className = 'error';}
	
}});
