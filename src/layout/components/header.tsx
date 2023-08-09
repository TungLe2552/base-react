import { Layout, Tooltip, theme as antTheme } from "antd"
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalState } from '@/stores/global.store';
import { ReactComponent as MoonSvg } from '@/assets/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/sun.svg';
import { createElement } from "react";

const { Header } = Layout
const HeaderComponent = () => {
  const { theme } = useSelector((state:any) => state.global);
  const dispatch = useDispatch();
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
    <Header style={{ backgroundColor: token.token.colorBgContainer }}>
      <div className="main-header">
        <div className="header-action">
          <Tooltip>
            <span>
              {createElement(theme === 'dark' ? SunSvg : MoonSvg, {
                onClick: onChangeTheme,
              })}
            </span>
          </Tooltip>
        </div>
      </div>
    </Header>
  )
}

export default HeaderComponent
