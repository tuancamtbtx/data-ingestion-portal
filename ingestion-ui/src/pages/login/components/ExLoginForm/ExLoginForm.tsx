import React, { useContext, useMemo } from 'react';

import { ConfigProvider } from 'antd';
import classNames from 'classnames';
import { ProFormProps } from '@ant-design/pro-components';
import { useIntl } from '@ant-design/pro-provider';

import { useStyle } from '@/pages/login/components/ExLoginForm/styles';

export type LoginFormProps<T> = {
  message: React.ReactNode | false;

  title: React.ReactNode | false;

  subTitle: React.ReactNode | false;

  actions: React.ReactNode;

  logo?: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];
  contentStyle?: React.CSSProperties;
} & Omit<ProFormProps<T>, 'title'>;

function ExLoginForm<T = Record<string, any>>(
  props: Partial<LoginFormProps<T>>,
) {
  const {
    logo,
    message,
    contentStyle,
    title,
    subTitle,
    actions,
    children,
    ...proFormProps
  } = props;
  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-login');
  const { wrapSSR, hashId } = useStyle(baseClassName);
  const getCls = (className: string) =>
    `${baseClassName}-${className} ${hashId}`;

  const logoDom = useMemo(() => {
    if (!logo) return null;
    if (typeof logo === 'string') {
      return <img src={logo} style={{ height: '100%', width: '100%' }} />;
    }
    return logo;
  }, [logo]);

  return wrapSSR(
    <div className={classNames(getCls('container'), hashId)}>
      <div className={`${getCls('top')} ${hashId}`}>
        {title || logoDom ? (
          <div className={`${getCls('header')}`}>
            {logoDom ? <div className={getCls('logo')}>{logoDom}</div> : null}
            {title ? <div className={getCls('title')}>{title}</div> : null}
          </div>
        ) : null}
        {subTitle ? <div className={getCls('desc')}>{subTitle}</div> : null}
      </div>
      <div
        className={getCls('main')}
        style={{
          width: 328,
          ...contentStyle,
        }}
      >
        {message}
        {children}
      </div>
    </div>,
  );
}
export { ExLoginForm };
