import DemoA from './pages/DemoA';
import DemoB from './pages/DemoB'
import DemoC from './pages/DemoC'
import DemoD from './pages/DemoD'
import KnowHooks from './pages/KnowHooks';

function App() {
  return (
    <div className="App">
      {/* useCallback作用 */}
      {/* <KnowHooks></KnowHooks> */}
      {/* Modal正常使用 */}
      {/* <DemoA /> */}
      {/* Modal封装 */}
      {/* <DemoB /> */}
      {/* Modal封装+拖拽 */}
      {/* <DemoC /> */}
      {/* Modal封装+拖拽+demo */}
      <DemoD />
    </div>
  );
}

export default App;
