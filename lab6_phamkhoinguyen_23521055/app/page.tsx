import Image from "next/image";

export default function Page() {
    "use memo";
  return (
    <main style={{ padding: 24 }}>
      <h1>Optimized Image</h1>
      <Image
        src="/hero.png"
        alt="Hero"
        width={1600}
        height={900}
        style={{ width: "100%", height: "auto" }}
        priority
      />
    </main>
  );
}
