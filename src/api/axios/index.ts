import { ContentTypeEnum, VAxios } from './axios'
import merge from 'lodash.merge'
import { getToken } from '../auth/helper'

const transform = {
  beforeRequestHook: (config:any, options:any) => {
    const { urlPrefix, joinPrefix, withoutToken, authenticationScheme, token } = options
    const { url } = config

    if (joinPrefix && urlPrefix) {
      if (url.trim()[0] === '/') {
        config.url = `${urlPrefix}${url}`
      } else {
        config.url = `${urlPrefix}/${url}`
      }
    }

    if (!withoutToken) {
      const temp_token = token || getToken()
      config.headers.Authorization = authenticationScheme ? `${authenticationScheme} ${temp_token}` : temp_token
    }

    return config
  },
  requestCatchHook: (e:any, options:any) => {
    return e
  }
}
/**
 *
 * @param {import("@/type/axios").CreateAxiosOptions} opt
 * @returns {VAxios}
 */
export function createAxios(opt = {}) {
  return new VAxios(
    merge(
      {
        transform,
        requestOptions: {
          joinPrefix: true,
          withoutToken: false,
          showLoading: true
        },
        // timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON }
      },
      opt
    )
  )
}
// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
// authentication schemes，e.g: Bearer
// authenticationScheme: 'Bearer',
export const sdk = createAxios({
  baseURL: '/',
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
    Accept: ContentTypeEnum.JSON
  },
  requestOptions: { urlPrefix: 'api', authenticationScheme: 'Bearer' }
})
