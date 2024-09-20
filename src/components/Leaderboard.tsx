import { Crown, Loader2, Medal, PartyPopper, Trophy } from "lucide-react";
import { Users } from "@/components/Users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetLeaderboard } from "@/hooks/api/useGetLeaderboard";

type Leaderboard = {
    id: string;
    name: string;
    points: number;
}[];

export const Leaderboard = () => {
    const leaderboardQuery = useGetLeaderboard();
    const leaderboardData: Leaderboard = leaderboardQuery.data || [];

    if (leaderboardQuery.isLoading) {
        return (
            <Card>
                <CardHeader className="bg-blue-500 rounded-lg">
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center mb-2 text-xl text-white font-semibold">
                            <Trophy className="size- mr-2" />
                            <span>Leaderboard</span>
                        </div>
                        <Users />
                    </CardTitle>
                </CardHeader>
                <CardContent className="-mt-2 h-[500px] flex items-center justify-center bg-white">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="bg-blue-500 rounded-lg">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center mb-2 text-xl text-white font-semibold">
                        <Trophy className="size- mr-2" />
                        <span>Leaderboard</span>
                    </div>
                    <Users />
                </CardTitle>
            </CardHeader>
            <CardContent className="-mt-2 bg-white min-h-[500px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-24 text-blue-500 font-bold">Rank</TableHead>
                            <TableHead className="text-blue-500 font-bold">Name</TableHead>
                            <TableHead className="text-right text-blue-500 font-bold">Points</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="font-semibold">
                        {leaderboardData.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>#{index + 1}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        {index === 0 && <Crown className="size-4 mr-2 text-yellow-600" />}
                                        {index === 1 && <Medal className="size-4 mr-2 text-red-600" />}
                                        {index === 2 && <PartyPopper className="size-4 mr-2 text-blue-600" />}
                                        <span>{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right text-emerald-500 font-bold">+{user.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
