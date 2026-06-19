import DataCatalog from "./pages/dataCatalog";
import { Toaster, toast } from 'sonner';
export default function App() {
  return(
    <>
    <DataCatalog />
    <div>
      <Toaster position="top-right" />
    </div>
  </>
  )
}