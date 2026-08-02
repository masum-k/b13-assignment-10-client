import React from 'react';
import Image from 'next/image';
import { getBooksbyId } from '@/lib/api/books';
import { Button, Link, Card } from '@heroui/react';
import { Book, Tag, ArrowUpRight } from '@gravity-ui/icons';

const Page = async ({ params }) => {
    const { id } = await params;
    const book = await getBooksbyId(id);

    if (!book) {
        return (
            <div className="w-full min-h-screen bg-slate-50/50 flex flex-col justify-center items-center text-slate-900 p-6">
                <Card className="p-8 text-center bg-white border border-slate-200 rounded-2xl">
                    <p className="text-slate-500 text-sm">Book could not be found or is no longer available.</p>
                </Card>
            </div>
        );
    }

    return (
        <main className="w-full min-h-screen bg-slate-50/50 text-slate-900 p-4 sm:p-8 font-sans max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* LEFT BLOCK: Cover & Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                        
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                            {/* Book Cover */}
                            <div className="relative w-full sm:w-48 h-64 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src={book.cover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"}
                                    alt={book.title || "Book cover"}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="space-y-3 flex-1">
                                {book.category && (
                                    <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                                        {book.category}
                                    </span>
                                )}

                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                                    {book.title}
                                </h1>

                                <p className="text-sm font-semibold text-slate-600">
                                    By {book.author || "Unknown Author"}
                                </p>
                            </div>
                        </div>

                        {/* Description Section */}
                        {book.description && (
                            <section className="space-y-2 border-t border-slate-100 pt-6">
                                <h3 className="text-sm font-bold text-slate-900">About this Book</h3>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                                    {book.description}
                                </p>
                            </section>
                        )}
                    </Card>
                </div>

                {/* RIGHT BLOCK: Overview & Actions */}
                <aside className="bg-white border border-slate-200 rounded-2xl p-6 lg:sticky lg:top-8 space-y-6 shadow-xs">
                    <h3 className="text-base font-bold text-slate-900">Book Information</h3>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Book className="text-red-600 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <span className="text-[11px] text-slate-500 block">Status</span>
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-300 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Available
                                </span>
                            </div>
                        </div>

                        {book.category && (
                            <div className="flex items-start gap-3">
                                <Tag className="text-red-600 w-5 h-5 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-[11px] text-slate-500 block">Category</span>
                                    <span className="text-xs font-semibold text-slate-800">{book.category}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                        as={Link}
                        href={`/books/${id}/borrow`}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                        endContent={<ArrowUpRight className="w-4 h-4" />}
                    >
                        Borrow This Book
                    </Button>
                </aside>

            </div>
        </main>
    );
};

export default Page;