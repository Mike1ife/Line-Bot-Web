import ProfileContent from "@/components/users/profile/ProfileContent/ProfileContent"

export default async function ProfilePage({ params }: { params: Promise<{ userName: string }> }) {
    const { userName } = await params;
    return <ProfileContent userName={decodeURIComponent(userName)} />;
}
