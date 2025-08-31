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
	const cards = document.querySelector("#cards");
	cards.innerHTML = "";

	myLibrary.forEach((book) => {
		const card = document.createElement("div");
		card.classList.add("card");

		const title = document.createElement("h1");
		title.textContent = `${book.title}`;

		const author = document.createElement("h2");
		author.textContent = `${book.author}`;

		const pages = document.createElement("h3");
		pages.textContent = `${book.pages}`;

		const read = document.createElement("h3");
		read.textContent = `${book.read}`;

		const updateReadButton = document.createElement("button");
		updateReadButton.textContent = "Update Status";
		updateReadButton.addEventListener("click", () => {
			if (book.read == "Read") {
				book.read = "Not Read";
			} else {
				book.read = "Read";
			}
			read.textContent = `${book.read}`;
		});

		const removeButton = document.createElement("button");
		removeButton.textContent = "Delete";
		removeButton.addEventListener("click", () => {
			const index = myLibrary
				.map((x) => {
					return x.id;
				})
				.indexOf(book.id);
			myLibrary.splice(index, 1);
			card.remove();
		});

		card.appendChild(title);
		card.appendChild(author);
		card.appendChild(pages);
		card.appendChild(read);
		card.appendChild(updateReadButton);
		card.appendChild(removeButton);
		cards.appendChild(card);
	});
	container.appendChild(cards);
}

const dialog = document.querySelector("dialog");

function modalButtons() {
	const openModalButton = document.querySelector("#open-btn");
	openModalButton.addEventListener("click", () => {
		dialog.showModal();
	});

	const closeModalButton = document.querySelector("#close-btn");
	closeModalButton.addEventListener("click", () => {
		dialog.close();
	});
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const formData = new FormData(form);
	const obj = Object.fromEntries(formData);
	addBookToLibrary(obj.title, obj.author, obj.pages, obj.read);
	displayBooks();
	form.reset();
	dialog.close();
});

addBookToLibrary("The Book", "Izin", "200 pages", "Not Read");
addBookToLibrary("Another Book", "Izin", "200 pages", "Read");
addBookToLibrary("Worst Book", "Izin", "200 pages", "Read");
addBookToLibrary("The Book", "Izin", "200 pages", "Not Read");
addBookToLibrary("Another Book", "Izin", "200 pages", "Read");
displayBooks();
modalButtons();
