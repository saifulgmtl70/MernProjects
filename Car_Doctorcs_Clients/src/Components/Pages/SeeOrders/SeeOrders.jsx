import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { TiTimes } from "react-icons/ti";
import Swal from 'sweetalert2'
 
const SeeOrders = () => {

    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/orders?email=${user.email}`;

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(url, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setOrders(data))

        // axios.get(url, {withCredentials: true})
        // .then(res =>{
        //     setOrders(res.data);
        // })

    }, [url])


    const handleDelete = (id) =>{
        console.log(id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            //   

            fetch(`http://localhost:5000/orders/${id}`,{
                method: 'DELETE',
                
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                if(data.deletedCount > 0){
                    Swal.fire(
                        'Deleted!',
                        'Your Cart Data has been deleted.',
                        'success'
                    )
                    // eslint-disable-next-line react/prop-types
                    const remaining = orders.filter(cart => cart._id !== id);
                    setOrders(remaining);
                }
            })

            }
        });

    }


    const handleOrderConfirm = (id) =>{
        
            fetch(`http://localhost:5000/orders/${id}`,{
                method: 'PATCH',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({status: 'confirm'})
            })

            .then(res => res.json())
            .then(data =>{
                console.log(data);
                if(data.modifiedCount > 0){
                    //Update state
                    const remaining = orders.filter(order => order._id !== id);
                    const updated = orders.find(order => order._id === id);
                    updated.status = 'Confirm';
                    const newOrders = [updated, ...remaining];
                    setOrders(newOrders);

                }
            })


            
        
    }

    return (
        <section className="px-12 py-10">
                <h3 className="text-center text-4xl font-medium mb-12">Your Cart</h3>
                <div className="mx-auto w-11/12">   

                    <div className="">
                            {orders.length === 0 ? (
                                <h2 className="text-center text-rose-500 font-medium text-3xl">Your Cart is empty</h2>
                            ) : (
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="text-xl text-cyan-900">
                                            <th>Service Photo</th>
                                            <th>Customer Name</th>
                                            <th>Customer Email</th>
                                            <th>Service Title</th>
                                            <th>Service Price</th>
                                            <th>Action</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {orders.map((order) => (
                                            <tr className="text-lg" key={order._id}>
                                                <td>
                                                    <img src={order.img} className="w-24 h-20 rounded-md" alt="Product" />
                                                </td>
                                                <td>{order.customerName}</td>
                                                <td>{order.email}</td>
                                                <td>{order.service_title}</td>
                                                <td>{order.price}</td>
                                                <td>
                                                    <button onClick={() => handleDelete(order._id)} className=" text-rose-500 rounded-sm text-3xl"> <TiTimes></TiTimes> </button>

                                                    
                                                </td>
                                                <td>
                                                {
                                                    order.status === 'confirm' ? <span className="text-xl font-bold text-cyan-900">Confiremd</span> :
                                                    <button onClick={() => handleOrderConfirm(order._id)} className=" text-rose-500 font-bold rounded-sm text-xl"> Confirm </button>
                                                }

                                                    
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                    </div>  
                             
                </div>
            </section>
    );
};

export default SeeOrders;