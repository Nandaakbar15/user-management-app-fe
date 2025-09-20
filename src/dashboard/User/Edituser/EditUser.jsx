import NavBar from "@/components/Navbar";
import Modal from "@/components/Modal";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function EditUserPages() {
    const {id} = useParams();
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [noTelp, setNoTelp] = useState("");
    const [statusAktif, setStatusAktif] = useState("");
    const [departemen, setDepartemen] = useState("");
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const getuserById = async() => {
            try {
                const response = await axios.get(`https://usermanagement-api.vercel.app/api/users/${id}`);
                const {nama, email, nomorTelepon, statusAktif, departemen} = response.data.data;

                setNama(nama);
                setEmail(email);
                setNoTelp(nomorTelepon);
                setStatusAktif(statusAktif);
                setDepartemen(departemen);
            } catch(error) {
                console.error("Error : ", error);
            }
        }

        getuserById();
    }, [id]);

    const UpdateUser = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://usermanagement-api.vercel.app/api/update-user/${id}`, {
                nama: nama,
                email: email,
                nomorTelepon: noTelp,
                statusAktif: statusAktif,
                departemen: departemen
            });

            setMessage(response.data.message);
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
                navigate('/user-list');
            }, 2000)
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    return (
        <div className="flex h-screen">
            <div className="flex flex-col flex-1">
                <NavBar/>
                <div className="container mx-auto mt-7">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-serif font-semibold">
                                Form edit user
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={UpdateUser} method="POST" className="space-y-4 animate-slide-down">
                                    <div className="p-6">
                                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700 text-[16px]">Nama</label>
                                        <input 
                                            type="text" 
                                            id="nama" 
                                            name="nama"
                                            value={nama}
                                            onChange={(e) => setNama(e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        />
                                    </div>
                                    <div className="p-6">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-[16px]">Email</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        />
                                    </div>
                                    <div className="p-6">
                                        <label htmlFor="nomortelepon" className="block text-sm font-medium text-gray-700 text-[16px]">Nomor Telepon</label>
                                        <input 
                                            type="text" 
                                            id="nomortelepon" 
                                            name="nomortelepon"
                                            value={noTelp}
                                            onChange={(e) => setNoTelp(e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="p-6">
                                        <label htmlFor="nomortelepon" className="block text-sm font-medium text-gray-700 text-[16px]">Departemen</label>
                                        <input 
                                            type="text" 
                                            id="departemen" 
                                            name="departemen"
                                            value={departemen}
                                            onChange={(e) => setDepartemen(e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="p-6">
                                        <label htmlFor="statusAktif" className="block text-sm font-medium text-gray-700 text-[16px]">Status Aktif</label>
                                        <input 
                                            type="text" 
                                            id="statusAktif" 
                                            name="statusAktif"
                                            value={statusAktif}
                                            onChange={(e) => setStatusAktif(e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <button type="submit"
                                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                        Edit
                                    </button>
                                </form>
                        </CardContent>
                        <CardFooter>
                            <Button variant={'secondary'}>
                                <Link to={'/user-list'}>
                                    Kembali
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <Modal>
                    isOpen={showModal} 
                    message={message} 
                    onClose={() => setShowModal(false)}
                </Modal>
            </div>
        </div>
    );
}