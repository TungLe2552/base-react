import {useEffect} from 'react'
import { ConfigProvider, Spin, theme as a } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import RenderRouter from '@/router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Suspense } from 'react'
import { getInitData } from './stores/features/auth'
import { PageLoading } from './pages/loading'
import dayjs from 'dayjs';
import { setGlobalState } from './stores/global.store';


function App() {
  const { theme,loading } = useSelector((state: any) => state.global)
  // const { locale } = useSelector((state:any) => state.user);

  const dispatch = useDispatch<any>()
  dispatch(getInitData())
  const setTheme = (dark = true) => {
    dispatch(()=>
      setGlobalState({
        theme: dark ? 'dark' : 'light',
      }),
    );
  };

  /** initial theme */
  useEffect(() => {
    setTheme(theme === 'dark');

    // watch system theme change
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      function matchMode(e: MediaQueryListEvent) {
        setTheme(e.matches);
      }

      mql.addEventListener('change', matchMode);
    }
  }, []);


  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#13c2c2' }, algorithm: theme === 'dark' ? a.darkAlgorithm : a.defaultAlgorithm }}
    >
      <Suspense>
        <Router>
          <Spin spinning={loading} className='app-loading-wrapper'></Spin>
          <RenderRouter />
        </Router>
      </Suspense>
    </ConfigProvider>
  )
}
export default App
