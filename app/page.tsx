export default async function Home() {
  const res = await fetch("https://biilybot.vercel.app/api/all_user_info", {
    cache: "no-store", // always fetch fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const users: { name: string; picture_url: string }[] = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      <ul className="space-y-4">
        {users.map((user, i) => (
          <li
            key={i}
            className="flex items-center space-x-4 border p-3 rounded-lg shadow-sm"
          >
            <img
              src={user.picture_url}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-lg font-medium">{user.name}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
