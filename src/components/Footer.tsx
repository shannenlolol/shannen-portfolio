import { footerMarkup } from "../cottage/footer";

export default function Footer() {
  return <div dangerouslySetInnerHTML={{ __html: footerMarkup }} />;
}
