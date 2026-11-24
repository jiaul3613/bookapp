'use client'

import { useEffect, useState } from "react"

interface Book {
  id: number
  title: string
  author: string
  isbn: string
  total_copies: number
  available_copies: number
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')

  useEffect(() => {
    fetch('http://localhost:4000/api/books/book')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setBooks(Array.isArray(data.data) ? data.data : [])
        setStatus('ready')
      })
      .catch((error) => {
        console.error('Fetch error:', error)
        setStatus('error')
      })
  }, [])

  if (status === 'loading') {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="animate-pulse text-lg font-medium text-gray-500">
          Loading books...
        </p>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <h1 className="text-base font-semibold">Failed to load data</h1>
          <p className="mt-1 text-sm text-red-600">
            Could not connect to the books service. Please try again later.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">
        Books
      </h1>

      {books.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
          No books found.
        </p>
      ) : (
        <ul className="space-y-3">
          {books.map((book) => {
            const isAvailable = book.available_copies > 0

            return (
              <li
                key={book.id}
                className="flex flex-col justify-between gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    ISBN: {book.isbn}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium ${
                    isAvailable
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20'
                      : 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20'
                  }`}
                >
                  {book.available_copies}/{book.total_copies} available
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}