import type { FC, ReactElement } from 'react';
import type { RouteProps } from 'react-router';

import PrivateRoute from './privateRoute';

export type WrapperRouteProps = RouteProps & {
  /** authorization？ */
  auth?: boolean;
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, ...props }) => {
  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
