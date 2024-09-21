import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CheckIcon, ChevronDown, Loader2, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useClaimPoints } from "@/hooks/api/useClaimPoints";
import { useGetUsers } from "@/hooks/api/useGetUsers";
import { useNewLeaderboard } from "@/hooks/store/useNewLeaderboard";
import { useState } from "react";

type Users = {
    id: string;
    name: string;
}[];

export const Users = () => {
    const { invalidateLeaderboard } = useNewLeaderboard();

    const [userId, setUserId] = useState<string | undefined>(undefined);

    const usersQuery = useGetUsers();
    const claimMutation = useClaimPoints();

    const users: Users = usersQuery.data || [];

    const handleChangeId = (newUserId: string) => {
        if (userId === newUserId) {
            setUserId(undefined);
        }
        else {
            setUserId(newUserId);
        }
    };

    const handlePointsClaim = async (userId?: string) => {
        const data = await claimMutation.mutate(userId);
            
        toast.success(`${data.name} was awarded +${data.points} points`, {
            position: "bottom-center",
        });
            
        invalidateLeaderboard();
    };

    if (usersQuery.isLoading) {
        return (
            <Button 
                variant="outline"
                className="h-9 rounded-md px-3 font-semibold bg-white/10 hover:bg-white/20 text-white hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none focus:bg-white/30 transition"
            >
                <Loader2 className="size-4 opacity-50 animate-spin" />
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="outline"
                    className="h-9 rounded-md px-3 font-semibold bg-white/10 hover:bg-white/20 text-white hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none focus:bg-white/30 transition"
                >
                    Users
                    <ChevronDown className="ml-2 size-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 bg-slate-50" align="end">
                <DropdownMenuItem className="flex items-center justify-between py-2" disabled={!userId}>
                    <span className="font-bold">Claim Points</span>
                    <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => handlePointsClaim(userId)}
                    >
                        <Plus className="size-3 mr-1" />
                        Claim
                    </Button>
                </DropdownMenuItem>
                {users.map((user) => (
                    <DropdownMenuLabel key={user.id} className="hover:scale-105 transition ease-in-out px-4 py-0.5">
                        <Button 
                            variant="ghost" 
                            type="button"
                            onClick={() => handleChangeId(user.id)}
                            className={cn(
                                "w-full flex items-center justify-between hover:bg-blue-100",
                                userId === user.id && "bg-blue-100",
                            )}
                        >
                            <div className="flex items-center justify-start font-medium">
                                <User className="size-4 mr-2" />
                                <span>{user.name}</span>
                            </div>
                            {userId === user.id && <CheckIcon className="size-4" />}
                        </Button>
                    </DropdownMenuLabel>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
