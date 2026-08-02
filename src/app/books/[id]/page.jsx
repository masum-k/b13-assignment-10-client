import React from 'react';
import { getBooksbyId } from '@/lib/api/books';

const page = async ({params}) => {


  
  const {id} = await params

  const book = await getBooksbyId(id)

  console.log(book)

  return (
    <div> 
        <h1>This is a dummy book {id}</h1>
    </div>
  );
};

export default page;