"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Chip,
  TextArea,
  Avatar,
  Slider,
  Modal,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  Calendar,
  CircleDollar,
  Ticket,
  Pencil,
  TrashBin,
  EyeSlash,
  ArrowUpRight,
  Star,
  StarFill,
} from "@gravity-ui/icons";
import { getBooksbyId } from "@/lib/api/books";
import { useSession } from "@/lib/auth-client";

// Static mapping of mock books to prevent backend 404 fetching issues
const STATIC_MOCK_BOOKS = {
  1: {
    id: 1,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    category: "Travel",
    description: "For years, rumors of the 'Marsh Girl' haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780735219090-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-01-15",
    librarianId: "lib_default",
  },
  2: {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Travel",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-01-18",
    librarianId: "lib_default",
  },
  3: {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Travel",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-02-01",
    librarianId: "lib_default",
  },
  4: {
    id: 4,
    title: "It Ends with Us",
    author: "Colleen Hoover",
    category: "Romance",
    description: "Sometimes it is the one who loves you who hurts you the most. Lily hasn't always had it easy, but that's never stopped her from working hard for the life she wants.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-02-05",
    librarianId: "lib_default",
  },
  5: {
    id: 5,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Travel",
    description: "Alicia Berenson's life is seemingly a pattern of domestic bliss. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-02-10",
    librarianId: "lib_default",
  },
  6: {
    id: 6,
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Travel",
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-02-12",
    librarianId: "lib_default",
  },
  7: {
    id: 7,
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    category: "Travels",
    description: "Set in early 1960s California, our modern heroine Elizabeth Zott is a scientist whose career takes a detour when she falls in love with a brilliant colleague.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-02-15",
    librarianId: "lib_default",
  },
  101: {
    id: 101,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    description: "From a notable historian comes a narrative history of humankind's creation and evolution, exploring how biology and history have defined us.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-01-10",
    librarianId: "lib_default",
  },
  102: {
    id: 102,
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    category: "History",
    description: "A brilliant work that attempts to explain why Eurasian and North American civilizations survived and conquered others, while others did not.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780393354379-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-01-11",
    librarianId: "lib_default",
  },
  201: {
    id: 201,
    title: "Astrophysics for People in a Hurry",
    author: "Neil deGrasse Tyson",
    category: "Science & Math",
    description: "What is the nature of space and time? How do we fit within the universe? Neil deGrasse Tyson brings the cosmos down to Earth succinctly and clearly.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780393609394-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-01-20",
    librarianId: "lib_default",
  },
  301: {
    id: 301,
    title: "It Ends with Us",
    author: "Colleen Hoover",
    category: "Romance",
    description: "Sometimes it is the one who loves you who hurts you the most.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg",
    deliveryFee: 4.99,
    status: "Available",
    dateAdded: "2026-01-25",
    librarianId: "lib_default",
  },
};

export default function BookDetailsPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Dynamic user session fallback
  const currentUser = {
    id: session?.user?.id || "",
    email: session?.user?.email || "",
    role: session?.user?.role || "reader",
  };

  const fetchBookDetails = async (id) => {
    // 1. Check if ID matches a static mock book to avoid invalid JSON API calls
    const numericId = Number(id);
    if (STATIC_MOCK_BOOKS[id] || STATIC_MOCK_BOOKS[numericId]) {
      const mockData = STATIC_MOCK_BOOKS[id] || STATIC_MOCK_BOOKS[numericId];
      setBook(mockData);
      setReviews([]);
      return;
    }

    // 2. Otherwise, fetch dynamically from the MongoDB database backend API
    try {
      const data = await getBooksbyId(id);
      const fetchedBook = data.book || data;

      // Map database status ("approved") to "Available" while handling other custom statuses safely
      const rawStatus = fetchedBook?.status || "Available";
      const mappedStatus =
        rawStatus.toLowerCase() === "approved" ? "Available" : rawStatus;

      const formattedBook = {
        id: fetchedBook?._id || fetchedBook?.id || id,
        title: fetchedBook?.title || "Untitled Book",
        author: fetchedBook?.author || "Unknown Author",
        category: fetchedBook?.category || "General",
        description: fetchedBook?.description || "No description provided.",
        coverUrl:
          fetchedBook?.coverUrl ||
          fetchedBook?.image ||
          fetchedBook?.imageUrl ||
          fetchedBook?.cover ||
          "/placeholder-book.jpg",
        deliveryFee: fetchedBook?.deliveryFee ?? 4.99,
        status: mappedStatus,
        dateAdded: fetchedBook?.createdAt
          ? new Date(fetchedBook.createdAt).toISOString().split("T")[0]
          : fetchedBook?.dateAdded || "N/A",
        librarianId: fetchedBook?.librarianId || "lib_default",
        librarianEmail: fetchedBook?.librarianEmail || "",
      };

      setBook(formattedBook);

      if (fetchedBook?.reviews && Array.isArray(fetchedBook.reviews)) {
        setReviews(fetchedBook.reviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Failed to fetch book details:", error);
    }
  };

  useEffect(() => {
    Promise.resolve(params).then((resolvedParams) => {
      if (resolvedParams?.id) {
        fetchBookDetails(resolvedParams.id);
      }
    });
  }, [params]);

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex justify-center items-center p-6">
        <Card className="p-8 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
          <Card className="p-0">
            <p className="text-xs font-semibold text-slate-500">
              Loading book details...
            </p>
          </Card>
        </Card>
      </div>
    );
  }

  const isLibrarianOwner =
    currentUser.role === "librarian" && currentUser.id === book.librarianId;
  const isDeliveryDisabled =
    book.status === "Checked Out" ||
    book.status === "Pending Delivery" ||
    isLibrarianOwner;

  const handleRedirect = async () => {
    if (!session?.user) {
      router.push(`/auth/signin?redirect=/books/${book.id}`);
      return;
    }
  };

  const handleUnpublish = () => {
    setBook((prev) => ({ ...prev, status: "Unpublished" }));
    alert("Book status changed to Unpublished.");
  };

  const handleDeleteConfirm = () => {
    setIsDeleteOpen(false);
    alert("Book deleted successfully.");
    router.push("/books");
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmittingReview(true);

    const newEntry = {
      id: `r_${Date.now()}`,
      user: currentUser.email.split("@")[0] || "Anonymous",
      rating: newRating,
      date: new Date().toISOString().split("T")[0],
      comment: newComment,
    };

    setTimeout(() => {
      setReviews([newEntry, ...reviews]);
      setNewComment("");
      setNewRating(5);
      setIsSubmittingReview(false);
    }, 500);
  };

  return (
    <main className="w-full min-h-screen bg-slate-50/50 text-slate-900 p-4 sm:p-8 font-sans max-w-7xl mx-auto space-y-8">
      {/* SECTION 1: BOOK OVERVIEW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT BLOCK: Book Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <Card className="p-0 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-full sm:w-48 h-64 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Chip
                      size="sm"
                      className="bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      {book.category}
                    </Chip>
                    <Chip
                      size="sm"
                      className={`text-[11px] font-semibold border ${
                        book.status === "Available"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-amber-50 text-amber-700 border-amber-300"
                      }`}
                    >
                      {book.status}
                    </Chip>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    {book.title}
                  </h1>

                  <p className="text-xs sm:text-sm font-medium text-slate-600">
                    Written by{" "}
                    <span className="text-slate-900 font-semibold">
                      {book.author}
                    </span>
                  </p>

                  <div className="pt-2 flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Added {book.dateAdded}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Ticket className="w-4 h-4 text-slate-400" />
                      <span>Delivery: ${Number(book.deliveryFee).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <section className="space-y-2 border-t border-slate-100 pt-6">
                <h3 className="text-sm font-bold text-slate-900">Description</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {book.description}
                </p>
              </section>

              {isLibrarianOwner && (
                <section className="border-t border-slate-100 pt-6 space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Librarian Controls
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      size="sm"
                      onClick={() => router.push(`/books/${book.id}/edit`)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
                      startContent={<Pencil className="w-3.5 h-3.5" />}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleUnpublish}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
                      startContent={<EyeSlash className="w-3.5 h-3.5" />}
                    >
                      Unpublish
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsDeleteOpen(true)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-xl"
                      startContent={<TrashBin className="w-3.5 h-3.5" />}
                    >
                      Delete Listing
                    </Button>
                  </div>
                </section>
              )}
            </Card>
          </Card>
        </div>

        {/* RIGHT BLOCK: Checkout Card */}
        <aside className="bg-white border border-slate-200 rounded-2xl p-6 lg:sticky lg:top-8 space-y-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900">Request Delivery</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CircleDollar className="text-red-600 w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">
                  Delivery Fee
                </span>
                <span className="text-sm font-bold text-slate-900">
                  ${Number(book.deliveryFee).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Ticket className="text-red-600 w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">
                  Fulfillment
                </span>
                <span className="text-xs font-semibold text-slate-800">
                  Direct Home Shipping
                </span>
              </div>
            </div>
          </div>

          <Button
            isDisabled={isDeliveryDisabled}
            isLoading={isCheckoutLoading}
            onClick={handleRedirect}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:bg-slate-200 disabled:text-slate-400"
            endContent={!isCheckoutLoading && <ArrowUpRight className="w-4 h-4" />}
          >
            {isLibrarianOwner
              ? "Your Listed Book"
              : book.status === "Checked Out"
              ? "Currently Checked Out"
              : "Request & Pay Delivery"}
          </Button>

          {isLibrarianOwner && (
            <p className="text-[11px] text-slate-400 text-center">
              Librarians cannot request delivery for their own books.
            </p>
          )}
        </aside>
      </div>

      {/* SECTION 2: REVIEWS */}
      <Card className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <Card className="p-0 space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Reader Reviews</h3>

          <form
            onSubmit={handleAddReview}
            className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Leave a Review
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewRating(star)}
                    className="text-amber-400 hover:scale-110 transition-transform"
                  >
                    {star <= newRating ? (
                      <StarFill className="w-4 h-4" />
                    ) : (
                      <Star className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <TextArea
              placeholder="Write your feedback regarding this book..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="text-xs"
              variant="bordered"
              rows={3}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={isSubmittingReview}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl px-5"
              >
                Submit Review
              </Button>
            </div>
          </form>

          <Slider className="bg-slate-100" />

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-xs text-slate-500">
                No reviews yet. Be the first to review this book!
              </p>
            ) : (
              reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="border-b border-slate-100 pb-4 space-y-2 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar
                        name={rev.user}
                        size="sm"
                        className="bg-red-100 text-red-700 text-xs font-bold"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          {rev.user}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) =>
                        i < rev.rating ? (
                          <StarFill key={i} className="w-3 h-3" />
                        ) : (
                          <Star key={i} className="w-3 h-3 text-slate-200" />
                        )
                      )}
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        placement="center"
      >
        <ModalContainer className="bg-white border border-slate-200 rounded-2xl p-2 text-slate-900">
          <ModalHeader className="font-bold text-base">
            Confirm Deletion
          </ModalHeader>
          <ModalBody>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">
                {book.title}
              </span>
              ? This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onClick={() => setIsDeleteOpen(false)}
              className="text-xs font-semibold text-slate-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl"
            >
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </main>
  );
}