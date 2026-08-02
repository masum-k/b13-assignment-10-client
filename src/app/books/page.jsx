import BooksCard from '@/components/BooksCard';
import { getBooks } from '@/lib/api/books';

// const initialBooks = [
//   {
//     id: "1",
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     category: "Classic",
//     copies: 4,
//     status: "Available",
//     cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
//   },
//   {
//     id: "2",
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     category: "Fiction",
//     copies: 0,
//     status: "Out of Stock",
//     cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
//   },
//   {
//     id: "3",
//     title: "1984",
//     author: "George Orwell",
//     category: "Sci-Fi",
//     copies: 2,
//     status: "Available",
//     cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
//   },
//   {
//     id: "4",
//     title: "Pride and Prejudice",
//     author: "Jane Austen",
//     category: "Romance",
//     copies: 5,
//     status: "Available",
//     cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
//   },
// ];

export default async function Page() {

  const books = await getBooks();

  return (
    <div>
      {/* <h2>books:{books.length}</h2> */}
      <BooksCard book={books} />
    </div>
  );
};

