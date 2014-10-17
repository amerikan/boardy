function Text(content, bounds, color, size, position, weight, style) {
	this.bounds = bounds;
	this.content = content;
	this.color = color;
	this.size = size;
	this.weight = weight;
	this.style = style;
	this.position = position;

	this.element = null;
	this.draw();
}

Text.prototype.draw = function () {

	var canvas = document.getElementById('canvas');
	var container = document.createElement('div');
	var textBox = document.createElement('div');
	
	var tools = document.createElement('div');
	var boldButton = document.createElement('button');
	var italicizeButton = document.createElement('button');
	var deleteButton = document.createElement('button');

	var that = this;

	textBox.innerHTML = this.content;

	textBox.style.border = '1px dotted transparent';
	textBox.style.display = 'block';
	textBox.style.position = 'absolute';
	textBox.style.cursor = 'move';

	textBox.style.fontSize = this.size;
	textBox.style.fontWeight = this.weight;
	textBox.style.color = this.color;
	textBox.style.width = this.bounds.width;
	textBox.style.height = this.bounds.height;

	boldButton.innerHTML = "<b>B</b>";
	boldButton.addEventListener('click', function (e) {
		if (that.weight === "bold") {
			that.weight = 'normal';
			textBox.style.fontWeight = 'normal';

		} else if (that.weight === "normal") {
			that.weight = 'bold';
			textBox.style.fontWeight = 'bold';
		}
	});

	italicizeButton.innerHTML = "<i>I</i>";
	italicizeButton.addEventListener('click', function (e) {
		if (that.style === "italic") {
			that.style = 'normal';
			textBox.style.fontStyle = 'normal';

		} else if (that.style === "normal") {
			that.style = 'italic';
			textBox.style.fontStyle = 'italic';
		}
	});

	deleteButton.innerHTML = "&times;";
	deleteButton.addEventListener('click', function (e) {
		canvas.removeChild(container);
	});

	tools.style.display = "none";
	tools.style.position = "absolute";
	tools.style.top = "-23px";
	tools.style.border = "1px solid #ccc";
	tools.appendChild(boldButton);
	tools.appendChild(italicizeButton);
	tools.appendChild(deleteButton);

	container.className = 'text-object';
	container.style.width= '100%';
	container.style.position = "absolute";
	container.style.top = this.position.top;
	container.style.left = this.position.left;

	container.appendChild(textBox);
	container.appendChild(tools);

	container.addEventListener('mouseover', function () {
		textBox.style.borderColor = "#000";
		tools.style.display = "block";
	});

	container.addEventListener('mouseleave', function () {
		textBox.style.borderColor = "transparent";
		tools.style.display = "none";
	});

	// Editable text
	textBox.addEventListener('dblclick', function (e) {
		e.stopPropagation();
		this.contentEditable = true;
		this.focus();
		this.style.background = "#ffffff";
	});

	textBox.addEventListener('blur', function () {
		var updatedText = textBox.innerText || textBox.textContent;

		that.content = updatedText;
		this.innerHTML = updatedText;
		this.contentEditable = false;
		this.style.background = "transparent";
	});

	// Dragging text box
	container.addEventListener('mousedown', function () {
		window.addEventListener('mousemove', move);
	});

	window.addEventListener('mouseup', function () {
		window.removeEventListener('mousemove', move);
	});

	function move(e) {

		that.position.top = e.clientY;
		that.position.left = e.clientX;

		container.style.top = e.clientY + 'px';
		container.style.left = e.clientX + 'px';
	}

	canvas.appendChild(container);

	this.element = textBox;
};