import DemoA from './pages/DemoA';
import DemoB from './pages/DemoB'
import DemoC from './pages/lower'
import KnowHooks from './pages/KnowHooks';

function App() {
  return (
    <div className="App">
      {/* useCallback作用 */}
      {/* <KnowHooks></KnowHooks> */}
      {/* Modal正常使用 */}
      {/* <DemoA /> */}
      {/* Modal初步封装 */}
      <DemoB />
    </div>
  );
}

export default App;
