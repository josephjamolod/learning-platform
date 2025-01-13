import Image from "next/image";

const DashboardSnippet = () => {
  return (
    <div className="relative py-20">
      <div className="w-full h- absolute rounded-[50%] radial--blur opacity-40 mx-10" />
      <div className="w-full aspect-video relative border border-muted-foreground">
        <Image
          priority
          src={"/dashboard-snippet.png"}
          className="opacity-[0.95] object-contain"
          sizes="100vw"
          fill
          alt="snippet"
        />
      </div>
    </div>
  );
};

export default DashboardSnippet;
