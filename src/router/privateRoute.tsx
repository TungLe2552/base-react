import type { FC } from 'react';
import type { RouteProps } from 'react-router';

import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/locales';
import { RootState } from '@/stores/index'

const PrivateRoute: FC<RouteProps> = props => {
  const { logged } = useSelector((state: RootState) => state.auth)
  const { formatMessage } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();

  return logged ? (
    (props.element as React.ReactElement)
  ) : (
    <Result
      status="403"
      title="403"
      extra={
        <Button
          type="primary"
          onClick={() => navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })}
        >
        </Button>
      }
    />
  );
};

export default PrivateRoute;
