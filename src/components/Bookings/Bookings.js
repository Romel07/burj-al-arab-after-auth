import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {

                'authorization': `Bearer ${sessionStorage.getItem('Token')}`,
                'Content-Type': 'application/json',
            }
        })
            // .then(res => {
            //     console.log(res.data);
            //     this.setState({
            //         items: res.data,  /*set response data in items array*/
            //         isLoaded: true,
            //         redirectToReferrer: false
            //     })
            // })
            .then(res => res.json())
            .then(data => {
                setBookings(data)
            })

    }, [])
    return (
        <div>
            <h3>You have {bookings.length} bookings</h3>
            {
                bookings.map(book =>
                    <li>{book.name} from {(new Date(book.checkIn).toDateString('dd/mm/yyyy'))} to {book.checkOut}</li>)
            }
        </div>
    );
};

export default Bookings;