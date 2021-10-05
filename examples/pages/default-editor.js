import dynamic from "next/dynamic";
import '@toast-ui/editor/dist/toastui-editor.css';
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  { loading: () => <h1>Loading..</h1>, ssr: false }
);
export default function DefaultEditor() {
  return (
    <div>
      <Editor height="500px" previewStyle="vertical"/>
    </div>
  );
}
