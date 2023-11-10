import api from '../../store/api'


const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: '/books'
      }),
      transformResponse: (response) => response.books,
    }),

    getBookById: builder.query({
      query: (id) => `books/${id}`,
    }),
    checkOutBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: ({ available: false })
      }),
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useCheckOutBookMutation } = booksApi

