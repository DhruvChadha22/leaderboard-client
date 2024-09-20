import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type Data = {
    id: string;
    name: string;
}[];


export const useGetUsers = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<Data>();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                toast.error("Failed to get users", {
                    position: "bottom-center",
                });
            });
    }, []);

    return { isLoading, data };
};
