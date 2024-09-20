import { Toaster } from "@/components/ui/sonner"
import { Leaderboard } from "@/components/Leaderboard";

export default function App() {
    return (
        <>
            <Toaster />
            <div className="flex items-center justify-center">
            <div className="w-[425px]">
                <div className="flex flex-row items-center justify-between py-4 px-2 mb-4">
                    <span className="text-2xl font-bold">Admin Dashboard</span>
                </div>
                <Leaderboard />
            </div>
        </div>
        </>
    );
};
