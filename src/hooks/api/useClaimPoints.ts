import axios from "axios";
import { toast } from "sonner"
import { useState } from "react";

export const useClaimPoints = () => {
    const [isPending, setIsPending] = useState<boolean>(false);

    const mutate = async (userId?: string) => {
        setIsPending(true);

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/claim/${userId}`)
        
        if (res.status !== 200) {
            return toast.error("Failed to claim points", {
                position: "bottom-center",
            });
        }

        setIsPending(false);
        return res.data;
    };

    return { isPending, mutate };
};
