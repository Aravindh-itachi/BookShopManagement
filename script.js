
document.getElementById('addBookForm').addEventListener('submit', addBook);
document.getElementById('booksContainer').addEventListener('showbook', displayBooks);



async function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const price = document.getElementById('price').value;
    var booktype = document.getElementById("bookType").value;

    try {
        const response = await axios.post('http://localhost:3000/api/books', {
            title,
            author,
            price,
            booktype
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });

        console.log('Book added:', response.data);
        // displayBooks(); // Refresh books list
    } catch (error) {
        console.error('Error:', error);
    }
}


// document.addEventListener('DOMContentLoaded', () => {
//     displayBooks();
//     displayInvoices();
// });

async function displayBooks() {
    const booksContainer = document.getElementById('booksContainer');
    booksContainer.innerHTML = ''; // Clear previous content

    try {
        const response = await axios.post('http://localhost:3000/api/displayBooks', {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        const books = await response.json();
        console.log(books);
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.innerHTML = `
                <p>Title: ${book.title}</p>
                <p>Author: ${book.author}</p>
                <p>Price: $${book.price}</p>
                <button onclick="purchaseBook('${book._id}')">Purchase</button>
            `;
            booksContainer.appendChild(bookElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function purchaseBook(bookId) {
    try {
        const response = await fetch(`http://localhost:3000/api/books/${bookId}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Book purchased:', data);
        displayBooks(); // Refresh books list
        displayInvoices(); // Refresh invoices list
    } catch (error) {
        console.error('Error:', error);
    }
}

async function displayInvoices() {
    const invoicesContainer = document.getElementById('invoicesContainer');
    invoicesContainer.innerHTML = ''; // Clear previous content

    try {
        const response = await fetch('http://localhost:3000/api/invoices');
        const invoices = await response.json();

        invoices.forEach(invoice => {
            const invoiceElement = document.createElement('div');
            invoiceElement.innerHTML = `
                <p>Title: ${invoice.title}</p>
                <p>Author: ${invoice.author}</p>
                <p>Price: $${invoice.price}</p>
                <p>Date: ${new Date(invoice.createdAt).toLocaleString()}</p>
            `;
            invoicesContainer.appendChild(invoiceElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
