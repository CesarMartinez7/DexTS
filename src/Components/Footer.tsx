import TypeScript from "../assets/typescript";
export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <div className="flex gap-1.5 items-center">
          <div className="font-medium text-lg">dex</div>
          <div className="-rotate-12">
            <TypeScript width={"24"} height={"24"} />
          </div>
        </div>
        <p className="opacity-95">Desarrollado por <span className="">@</span><strong>Martinez Cesar</strong> - {new Date().getFullYear()}</p>
      </aside>
    </footer>
  );
}
