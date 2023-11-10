import { useGetUserQuery, useGetReservationsQuery, useDeleteReservationMutation } from './accountSlice'
import { useSelector } from 'react-redux'
import { selectToken } from '../Auth/authSlice';
import { useEffect } from 'react';


function Account() {
  const { data, isLoading, isError } = useGetUserQuery();
  const token = useSelector(selectToken);

  const { data: reservations, refetch: refetchReservations } = useGetReservationsQuery();

  const [returnBook] = useDeleteReservationMutation();


  const handleReturn = (reservationId) => {
    returnBook(reservationId).unwrap().then(() => {
      refetchReservations();
    });
  };

  useEffect(() => {
    refetchReservations();
  }, [])

  if (isLoading) {
    return <h1>Loading ...</h1>
  }

  if (isError) {
    return <h1>Something went wrong ...</h1>
  }


  if (token) {

    return (
      <div className="profile-card">
        <div className="profile-contents">
          <h1>Welcome, {data.firstname}!</h1>
          <h2>User Info:</h2>
          <p className="profile-title">First Name: </p>
          <p>{data.firstname}</p>
          <p className="profile-title">Last Name: </p>
          <p>{data.lastname}</p>
          <p className="profile-title">Email: </p>
          <p>{data.email}</p>
          <p className="profile-title">Reserved Books:</p>
          {
            reservations?.reservation?.length === 0 ? (
              <p className="no-reservations"> You haven't borrowed any books.</p>)
              : (
                reservations?.reservation.map((r) => {
                  return <div className="reserved-books" key={r.id}>
                    <h4>{r.title}</h4>
                    <h5>{r.author}</h5>
                    <img className="book-covers" src={r.coverimage} />
                    <br />
                    <br />
                    <button className="return" onClick={() => { handleReturn(r.id) }}>Return Book</button>
                  </div>
                }))
          }
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p> Please log in or create an account to view your user information.</p>
      </div>
    );
  }
}

export default Account