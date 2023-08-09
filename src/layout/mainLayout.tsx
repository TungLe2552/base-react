import { Layout, theme as antTheme } from 'antd'
import HeaderComponent from './components/header'
import { Outlet } from 'react-router'

const { Content } = Layout
const MainLayout = () => {
  const token = antTheme.useToken();
  return <Layout style={{ backgroundColor: token.token.colorBgContainer }}>
    <HeaderComponent/>
    <Content>
      <Outlet />
    </Content>
  </Layout>
}

export default MainLayout
