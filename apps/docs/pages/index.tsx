import { Button } from "ui";
import { testFunc } from "utils";

export default function Docs() {
  return (
    <div>
      <h1>Docs</h1>
      <button onClick={testFunc}>log</button>
      <Button />
    </div>
  );
}
