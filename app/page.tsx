import Image from "next/image";
import FormBuilder from "@/components/builder/FormBuilder";
import { PreviewProvider } from '@/context/preview.context';

export default function Home() {
  return (
    <PreviewProvider>
      <FormBuilder/>
    </PreviewProvider>
  );
}
