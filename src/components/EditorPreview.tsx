import { useState } from "react";

/** The Image Editor's before/after toggle, shared by the Projects list and its own page. */
export default function EditorPreview() {
  const [after, setAfter] = useState(true);
  return <figure className="project-preview editor-preview">
    <div className="preview-topline">
      <span>Background removal</span>
      <div className="preview-switch" role="group" aria-label="Image Editor preview">
        <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>Before</button>
        <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>After</button>
      </div>
    </div>
    <div className="editor-preview-canvas">
      <a href={`/assets/images/projects/image-editor/${after ? "after" : "before"}.png`} target="_blank" rel="noreferrer" data-lightbox>
        <img src={`/assets/images/projects/image-editor/${after ? "after" : "before"}.png`} alt={after ? "Image Editor with an apple isolated on a transparent background" : "Image Editor with the original apple photo on a green background"} loading="lazy" width="1920" height="960" />
      </a>
    </div>
  </figure>;
}
