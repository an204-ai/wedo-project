import useAuthStore from '@/stores/authStore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { useEffect } from 'react';

const Profile = () => {
    const user = useAuthStore((state) => state.user);
    const fetchMe = useAuthStore((state) => state.fetchMe);
    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <Card className="w-full max-w-md shadow-lg rounded-2xl">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg font-semibold">
                    {user?.displayName?.[0]?.toUpperCase() ||
                    user?.userName?.[0]?.toUpperCase()}
                </AvatarFallback>
                </Avatar>

                <div>
                <CardTitle>{user?.displayName || user?.userName}</CardTitle>
                </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tên đăng nhập</span>
                <span className="font-medium">{user?.userName}</span>
                </div>

                <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="font-medium">{user?.userEmail}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default Profile