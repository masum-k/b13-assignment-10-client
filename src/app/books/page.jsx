import BooksCard from '@/components/BooksCard';
import { getBooks } from '@/lib/api/books';

export default async function Page() {

  const books = await getBooks();

  return (
    <div>
      {/* <h2>books:{books.length}</h2> */}
      <BooksCard book={books} />
    </div>
  );
};

