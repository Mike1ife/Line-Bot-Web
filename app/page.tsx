export default async function Page() {
  const res = await fetch("https://biilybot.vercel.app/api/cron", {
    // Ensure SSR fetch (not cached by static rendering)
    cache: "no-store",
  });

  const data = await res.text();

  return (
    <main>
      <h1>Flask API Demo</h1>
      <p>Response: {data}</p>
    </main>
  );
}
