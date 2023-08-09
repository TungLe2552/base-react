import { Button, Result } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { FC } from 'react'
import { ROLE } from '@/interface/user/user'

export const Page403: FC<{ role?: ROLE }> = ({ role }) => {
  const navigate = useNavigate()
  const location = useLocation()
  let route_login = '/login'
  if (role === ROLE.sysadmin) {
    route_login = '/admin/login'
  }
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={
        <Button
          type='primary'
          onClick={() =>
            navigate(`${route_login}${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })
          }
        >
          Go To Login
        </Button>
      }
    />
  )
}
