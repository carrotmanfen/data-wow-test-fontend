import Login from "@/components/loginComponent";
import Image from "next/image";


export default function Home() {
    const handleGoToLogin = () => {
        window.location.href = '/login';
    }
  return (
    <main
      className={`flex h-screen w-screen items-center justify-center`}
    >
        <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-lg p-6 bg-white border rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center ">Description</h2>
                <p className="mb-6 text-center">This is a project for Data Wow company assignment</p>
                <p className="mb-6 text-center">This web is a very simple for small social media</p>
                <button
                    className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2"
                    onClick={handleGoToLogin}
                >Go to Login Page</button>
            </div>
        </div>
    </main>
  );
}
