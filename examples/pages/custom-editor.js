import dynamic from "next/dynamic";
const Mde = dynamic(() => import("mde10"), {
  ssr: false,
  loading: () => <h1>Loading the editor...</h1>,
});
export default function CustomEditor() {
  return (
    <div>
      <Mde />
    </div>
  );
}
