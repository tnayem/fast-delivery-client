import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const {
        data: parcels = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['my-parcels', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    if (loading || isLoading) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    const handleDelete =(id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            try {
                await axiosSecure.delete(`/parcels/${id}`);
                if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
            refetch();
            } catch (error) {
                console.log(error);
            }
        });
    };

    return (
        <div className="bg-base-100 shadow-xl rounded-xl p-4">
            <h2 className="text-2xl font-bold mb-4">
                My Parcels ({parcels.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Parcel</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>

                                <td>
                                    <div>
                                        <p className="font-semibold">{parcel.parcelName}</p>
                                        <p className="text-xs text-gray-400">
                                            {parcel.tracking_Id}
                                        </p>
                                    </div>
                                </td>

                                <td>{parcel.parcelType}</td>

                                <td className="font-bold">৳{parcel.totalPrice}</td>

                                <td>
                                    <span
                                        className={`badge text-white ${parcel.payment_status === 'paid'
                                            ? 'badge-success'
                                            : 'badge-error'
                                            }`}
                                    >
                                        {parcel.payment_status}
                                    </span>
                                </td>

                                <td>
                                    <span className="badge capitalize">
                                        {parcel.delivery_status.replaceAll('_', ' ')}
                                    </span>
                                </td>

                                <td className="text-center space-x-1">
                                    <button className="btn btn-xs btn-info">View</button>
                                    <button className="btn btn-xs btn-warning">Track</button>
                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-400">
                                    No parcels found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;
