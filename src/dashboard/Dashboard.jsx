import NavBar from "../components/Navbar";

export default function DashboardPages() {
  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold">
          Kelola Data Pengguna dengan Lebih Mudah
        </h1>
        <p className="font-serif text-base sm:text-lg lg:text-xl text-slate-500 mt-2 max-w-2xl">
          Aplikasi ini menyediakan solusi lengkap untuk manajemen user, mulai dari
          pendaftaran hingga pembaruan data, semua dalam satu platform yang bersih dan mudah
          digunakan.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-xl">
            <h2 className="font-semibold text-lg">Card 1</h2>
            <p className="text-sm text-slate-500">Ini adalah card 1</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-xl">
            <h2 className="font-semibold text-lg">Card 2</h2>
            <p className="text-sm text-slate-500">Ini adalah card 2</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-xl">
            <h2 className="font-semibold text-lg">Card 3</h2>
            <p className="text-sm text-slate-500">Ini adalah card 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}