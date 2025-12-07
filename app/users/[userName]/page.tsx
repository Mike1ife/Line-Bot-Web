import MainContent from "@/components/profile/MainContent/MainContent"

export default async function ProfilePage({ params }: { params: Promise<{ userName: string }> }) {
    const { userName } = await params;
    return <MainContent userName={decodeURIComponent(userName)} />;
}
