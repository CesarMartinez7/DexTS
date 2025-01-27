export default function Loading() {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 ">
        <span className="loading loading-spinner loading-xl"></span>
        <span>Por favor, espera.</span>
      </div>
    </div>
  );
}
