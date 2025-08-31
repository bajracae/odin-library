const myLibrary = [];

function Book(title, author, pages, read) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}
	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function () {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
	};
}

function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
}

function displayBooks() {
	const container = document.querySelector("#container");
	// addBookToLibrary("The Book", "Izin", "200 pages", "Have read");
	// addBookToLibrary("Another Book", "Izin", "200 pages", "Have read");
	// addBookToLibrary("Worst Book", "Izin", "200 pages", "Have read");
	myLibrary.forEach((book) => {
		console.log("here");
		const card = document.createElement("div");
		card.classList.add("card");
		const title = document.createElement("h1");
		title.textContent = book.title;
		const author = document.createElement("h1");
		author.textContent = book.author;
		const pages = document.createElement("h1");
		pages.textContent = book.pages;
		const read = document.createElement("h1");
		read.textContent = book.read;

		const updateReadButton = document.createElement("button");
		updateReadButton.textContent = "Update Read Status";
		updateReadButton.addEventListener("click", () => {
			if (book.read == "Have read") {
				book.read = "Have not read";
				read.textContent = "Have not read";
			} else {
				book.read = "Have read";
				read.textContent = "Have read";
			}
		});

		const removeButton = document.createElement("button");
		removeButton.textContent = "X";
		removeButton.addEventListener("click", () => {
			card.remove();
		});

		card.appendChild(title);
		card.appendChild(author);
		card.appendChild(pages);
		card.appendChild(read);
		card.appendChild(updateReadButton);
		card.appendChild(removeButton);
		container.appendChild(card);
	});
}

function openModal() {
	const dialog = document.querySelector("dialog");
	const showButton = document.querySelector("dialog + button");

	// "Show the dialog" button opens the dialog modally
	showButton.addEventListener("click", () => {
		console.log("show button clicked!");
		dialog.showModal();
	});
}

function closeModal() {
	const dialog = document.querySelector("dialog");

	const form = document.querySelector("form");
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(form);
		const obj = Object.fromEntries(formData);
		addBookToLibrary(obj.title, obj.author, obj.pages, obj.read);
		dialog.close();

		const container = document.querySelector("#container");
		const card = document.createElement("div");
		card.classList.add("card");
		const title = document.createElement("h1");
		card.appendChild(title);
		const author = document.createElement("h1");
		card.appendChild(author);
		const pages = document.createElement("h1");
		card.appendChild(pages);
		const read = document.createElement("h1");
		card.appendChild(read);

		const updateReadButton = document.createElement("button");
		updateReadButton.textContent = "Update Read Status";
		updateReadButton.addEventListener("click", () => {
			if (obj.read == "Have read") {
				obj.read = "Have not read";
				read.textContent = "Have not read";
			} else {
				obj.read = "Have read";
				read.textContent = "Have read";
			}
		});

		const removeButton = document.createElement("button");
		removeButton.textContent = "X";
		removeButton.addEventListener("click", () => {
			card.remove();
		});

		title.textContent = obj.title;
		author.textContent = obj.author;
		pages.textContent = obj.pages;
		read.textContent = obj.read;
		card.appendChild(updateReadButton);

		card.appendChild(removeButton);

		container.appendChild(card);
	});
}

displayBooks();
openModal();
closeModal();
