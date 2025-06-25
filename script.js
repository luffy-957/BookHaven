const myBookShelf=[];
class Book{
    constructor(title,author,pages,read){
        this.id=crypto.randomUUID();
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read;
    }
    revertReadStatus(){
        this.read=!this.read;
    }
}

function addNewBook(title,author,pages,read)
{
    const newBook=new Book(title, author, pages, read);
    myBookShelf.push(newBook);
    displayBooks();
}

function displayBooks()
{
    const displayDiv = document.querySelector(".books-display");
    displayDiv.innerHTML = '';
    myBookShelf.forEach((book)=>{
        let bookCard=document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id',book.id);
        bookCard.innerHTML=`
            <h3>${book.title}</h3>
            <p class="author-name">Author: ${book.author}</p>
            <p class="pages-count">Pages: ${book.pages}</p>
            <p class="read-status">Read Status:${book.read?'Read':'Not read'}</p>
            <button class="read-toggle-button">Read</button>
            <button class="remove-button">Remove</button>
        `;

        const readToggle=bookCard.querySelector(".read-toggle-button");
        const removeBookBtn=bookCard.querySelector(".remove-button");
        readToggle.addEventListener('click',()=>{toggleReadStatus(book.id);});
        removeBookBtn.addEventListener('click',()=>{removeBook(book.id);});

        document.querySelector(".books-display").appendChild(bookCard);
    });
}

function toggleReadStatus(id)
{
    const book=myBookShelf.find((book)=>book.id===id)
    if(book)
    {
        book.revertReadStatus();
        displayBooks();
    }
}
function removeBook(id){
    const bookIndex=myBookShelf.findIndex((book)=>book.id===id);
    if(bookIndex!==-1)
    {
        myBookShelf.splice(bookIndex,1);
        displayBooks();
    }
}
document.addEventListener('DOMContentLoaded',(event)=>{
    const newBookButton = document.getElementById("new-book-button");
    const bookDialog = document.getElementById("book-dialog");
    const bookForm = document.getElementById("book-form");
    const cancelButton = document.getElementById("cancel-button");
    newBookButton.addEventListener('click',(event)=>{
        bookDialog.showModal();
    });
    cancelButton.addEventListener('click',()=>{
        bookDialog.close();
    })
    bookForm.addEventListener("submit",(event)=>{
        event.preventDefault();
        const bookTitle=document.getElementById('title').value;
        const authorName=document.getElementById('author').value;
        const pagesCount=document.getElementById('pages').value;
        const readStatus=document.getElementById('read').checked;
        
        addNewBook(bookTitle,authorName,pagesCount,readStatus);

        bookForm.reset();
        bookDialog.close();
    });

});