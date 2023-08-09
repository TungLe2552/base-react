import { FC } from 'react'
import vi from './vi'
import en from './en'

import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl'

export const localeConfig = {
  vi: vi,
  en: en
}

type Id = keyof typeof vi

interface Props extends MessageDescriptor {
  id: Id
}

export const LocaleFormatter: FC<Props> = ({ ...props }) => {
  const notChildProps = { ...props, children: undefined }

  return <FormattedMessage {...notChildProps} id={props.id} />
}

type FormatMessageProps = (descriptor: Props) => string

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl()
  const formatMessage: FormatMessageProps = _formatMessage

  return {
    ...rest,
    formatMessage
  }
}
