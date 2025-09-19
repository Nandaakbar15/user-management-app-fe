import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import {Card} from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@/components/Modal";

export default function IndexUserPages() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const getUsers = async() => {
        try {
            const response = await axios.get("http://localhost:3000/api/users");
            setUsers(response.data.data);
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    const deleteUser = async(id_user) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/delete-user/${id_user}`);

            setMessage(response.data.message);
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
                navigate('/user-list')
            });

            // refresh the data
            getUsers();
            
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    useEffect(() => {
        getUsers()
    }, []);


    return (
        <div className="flex h-screen">
            <div className="flex flex-1 flex-col">
                <NavBar/>
                <div className="container mx-auto mt-7 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-serif font-bold mb-3">List User</h1>
                    <h2>
                        <Link to={'/add-user'} className="bg-blue-500 inline-block px-4 py-2 text-white rounded-lg shadow-lg hover:bg-blue-700 mb-3">
                            Tambah user
                        </Link>
                    </h2>
                    <div className="overflow-x-auto mt-3">
                        <Card>
                            <Table className="animate-slide-down min-w-[800px]">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-medium font-sans text-sm sm:text-base lg:text-[16px] px-4 py-2">Nama</TableHead>
                                        <TableHead className="font-medium font-sans text-sm sm:text-base lg:text-[16px] px-4 py-2">Email</TableHead>
                                        <TableHead className="font-medium font-sans text-sm sm:text-base lg:text-[16px] px-4 py-2">Nomor Telepon</TableHead>
                                        <TableHead className="font-medium font-sans text-sm sm:text-base lg:text-[16px] px-4 py-2">Status Aktif</TableHead>
                                        <TableHead className="font-medium font-sans text-sm sm:text-base lg:text-[16px] px-4 py-2">Departemen</TableHead>
                                        <TableHead className="font-medium font-sans text-sm sm:text-base lg:text-[16px] px-4 py-2">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium font-sans text-[16px] px-4 py-2">{user.nama}</TableCell>
                                            <TableCell className="font-medium font-sans text-[16px] px-4 py-2">{user.email}</TableCell>
                                            <TableCell className="font-medium font-sans text-[16px] px-4 py-2">{user.nomorTelepon}</TableCell>
                                            <TableCell className="font-medium font-sans text-[16px] px-4 py-2">{user.statusAktif.toString()}</TableCell>
                                            <TableCell className="font-medium font-sans text-[16px] px-4 py-2">{user.departemen}</TableCell>
                                            <TableCell className="space-x-2 gap-2">
                                                <Link to={`/update-user/${user.id}`} className="bg-slate-400 inline-block text-white px-4 py-2 rounded-lg shadow-lg hover:bg-slate-600">
                                                    Edit
                                                </Link>
                                                <button className="bg-red-500 inline-block px-4 py-2 rounded-lg shadow-lg text-white hover:bg-red-700" onClick={() => deleteUser(user.id)}>
                                                    Delete
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                </div>
                <Modal
                    isOpen={showModal}
                    message={message}
                    onClose={() => setShowModal(false)}
                />
            </div>
        </div>
    );
}