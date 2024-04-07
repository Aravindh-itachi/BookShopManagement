document.getElementById('addBookForm').addEventListener('submit', addBook);
document.getElementById('showBooksBtn').addEventListener('click', displayBooks);

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




async function displayBooks(event) {
    event.preventDefault();
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = ''; // Clear previous content

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
            var cardContent = `
//             <div class="cards-content">
//                 <label>Book Title: ${book.title}</label><br>
//                 <label>Author: ${book.author}</label><br>
//                 <label>Price: ${book.price}</label><br>
//                 <a href="/invoice.html">Bill</a>
//             </div>
//             <hr>
//         `;
//         container.innerHTML += cardContent;
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



// showing Book
// document.getElementById("showBooksBtn").addEventListener("click", function() {
//     // Simulating API response (replace with actual API call)
//     var booksArrayFromAPI = [
//         { title: "Book 1", author: "Author 1", price: "$10" },
//         { title: "Book 2", author: "Author 2", price: "$15" },
//         { title: "Book 3", author: "Author 3", price: "$20" }
//         // Add more books here if needed
//     ];

//     var container = document.getElementById("cartContainer");
//     container.innerHTML = ""; // Clear previous content

//     // Generate cart content based on the number of books received
//     booksArrayFromAPI.forEach(function(book) {
//         var cardContent = `
//             <div class="cards-content">
//                 <label>Book Title: ${book.title}</label><br>
//                 <label>Author: ${book.author}</label><br>
//                 <label>Price: ${book.price}</label><br>
//                 <a href="/invoice.html">Bill</a>
//             </div>
//             <hr>
//         `;
//         container.innerHTML += cardContent;
//     });
// });