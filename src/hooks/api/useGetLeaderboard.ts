import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNewLeaderboard } from "@/hooks/store/useNewLeaderboard";

type Data = {
    id: string;
    name: string;
    points: number;
}[];

export const useGetLeaderboard = () => {
    const { isInvalid, revalidateLeaderboard } = useNewLeaderboard();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<Data>();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/leaderboard`)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
                revalidateLeaderboard();
            })
            .catch(() => {
                setIsLoading(false);
                toast.error("Failed to get leaderboard", {
                    position: "bottom-center",
                });
            });
    }, [isInvalid]);

    return { isLoading, data };
};
