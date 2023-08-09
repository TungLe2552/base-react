import { FC } from "react";
import { useRoutes } from "react-router-dom";
import { Navigate } from 'react-router'
import { lazy } from 'react'
import type { RouteObject } from 'react-router'
import WrapperRouteComponent from './config'

const Home = lazy(() => import('@/pages/home'))
const routeList: RouteObject[] = [
  {
    path: '/',
    element: <WrapperRouteComponent element={<Home />} />,
  },
]

const RenderRouter: FC = () => {
  const element = useRoutes(routeList)

  return element
}

export default RenderRouter
