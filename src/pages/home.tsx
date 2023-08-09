import { Layout, Button, Tooltip, theme as antTheme} from 'antd';
import { createElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalState } from '@/stores/global.store';
import { ReactComponent as MoonSvg } from '@/assets/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/sun.svg';
import { Typography } from 'antd';
import MainLayout from '@/layout/mainLayout';

const { Title } = Typography;

const { Content, Footer, Sider } = Layout;
const Home = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state:any) => state.global);
  const token = antTheme.useToken();
  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };
  return (
    <Layout className='container' style={{ backgroundColor: token.token.colorBgContainer }}>
      <MainLayout />
    </Layout>
  )
}

export default Home
