import NavBar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";

export default function TambahUserPages() {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [noTelp, setNoTelp] = useState("");
    const [statusAktif, setStatusAktif] = useState("");
    const [departemen, setDepartemen] = useState("");
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const addUser = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/api/add-user", {
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
                navigate('/users');
            }, 2000);

            // clear the form
            setNama("");
            setEmail("");
            setNoTelp("");
            setStatusAktif("");
            setDepartemen("");
        } catch(error) {
            console.error("Error : ", error);

            setMessage("Error! Tidak dapat menambah user baru!");
            setShowModal(true);
        }
    }

    return (
        <div className="flex h-screen">
            <div className="flex flex-1 flex-col">
                <NavBar/>
                <div className="container mx-auto mt-7 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w mt-10">
                        <Card>
                            <CardContent>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-medium font-sans">
                                        Form tambah User
                                    </CardTitle>
                                </CardHeader>
                                <form onSubmit={addUser} method="POST" className="space-y-6 animate-slide-down">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                        <div>
                                            <label htmlFor="nama" className="block text-sm font-medium font-sans text-gray-700 text-[16px]">Nama</label>
                                            <input 
                                                type="text" 
                                                id="nama" 
                                                name="nama"
                                                onChange={(e) => setNama(e.target.value)}
                                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium font-sans text-gray-700 text-[16px]">Email</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="nomortelepon" className="block text-sm font-medium font-sans text-gray-700 text-[16px]">Nomor Telepon</label>
                                            <input 
                                                type="text" 
                                                id="nomortelepon" 
                                                name="nomortelepon"
                                                onChange={(e) => setNoTelp(e.target.value)}
                                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="departemen" className="block text-sm font-medium font-sans text-gray-700 text-[16px]">Departemen</label>
                                            <input 
                                                type="text" 
                                                id="departemen" 
                                                name="departemen"
                                                onChange={(e) => setDepartemen(e.target.value)}
                                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="statusAktif" className="block text-sm font-medium font-sans text-gray-700 text-[16px]">Status Aktif</label>
                                            <select 
                                                id="statusAktif"
                                                name="statusAktif"
                                                onChange={(e) => setStatusAktif(e.target.value)}
                                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Pilih status</option>
                                                <option value="true">Aktif</option>
                                                <option value="false">Tidak Aktif</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 px-6 pb-6">
                                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 font-sans rounded-lg hover:bg-blue-700 transition">
                                            Tambah
                                        </button>
                                    </div>
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
                </div>
            </div>
            <Modal>
                isOpen={showModal} 
                message={message} 
                onClose={() => setShowModal(false)}
            </Modal>
        </div>
    );
}