import { PreviewApp } from './src/dev/PreviewApp';
import { WidgetHarness } from './src/dev/WidgetHarness';

/** Pass-1 review build (D-021/D-023): shared sample screens + native diagnostics. */
export default function App() {
  return <PreviewApp widgetTools={<WidgetHarness />} />;
}
