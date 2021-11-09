import { useRef } from "react";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  { loading: () => <h1>Loading..</h1>, ssr: false }
);
export default function DefaultEditor() {
  const eRef = useRef(null);

  const handleChange = () => {
    if (!eRef) return;
    console.log(eRef.current.retry());
  };
  return (
    <div>
      <Editor
        ref={eRef}
        height="500px"
        previewStyle="vertical"
        autofocus={true}
        onChange={handleChange}
        onKeydown={() => console.log("pressed..")}
      />
    </div>
  );
}
