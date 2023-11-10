import api from '../../store/api'

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/users/me',
        headers: {
          'Content-Type': 'application/json'
        },
      }),
    }),
    getReservations: builder.query({
      query: () => ({
        url: '/reservations',
        headers: {
          'Content-Type': `application/json`
        },
      }),
    }),
    deleteReservation: builder.mutation({
      query: (reservationId) => ({
        url: `reservations/${reservationId}`,
        method: 'DELETE',
      })
    })
  }),
});

export const { useGetUserQuery, useGetReservationsQuery, useDeleteReservationMutation } = userApi;
