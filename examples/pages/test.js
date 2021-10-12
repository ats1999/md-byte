import { h } from "mdh10";
import "katex/dist/katex.min.css";
export default function Test() {
  console.log(h("Rahul $\\sum$"));
  return <div dangerouslySetInnerHTML={{ __html: h("Rahul $\\sum$") }}></div>;
}
