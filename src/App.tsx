import { Toaster } from 'sonner';
import { Builder } from './pages/Builder';

function App() {
  return (
    <>
      <Builder />
      <Toaster position="bottom-left" richColors theme="light" />
    </>
  );
}

export default App;
