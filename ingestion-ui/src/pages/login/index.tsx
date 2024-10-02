import { App } from 'antd';
import { useModel, useNavigate } from '@umijs/max';

import { login, setAuthToken } from '@/services/auth';
import GoogleSSOConfig from '@/config/google';
import { ExLoginForm } from '@/pages/login/components/ExLoginForm/ExLoginForm';
import { getPageQuery } from '@/utils';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export default () => {
  const { refresh } = useModel('@@initialState');
  const navigate = useNavigate();
  const { message } = App.useApp();

  const responseMessage = async (credentialResponse: any) => {
    try {
      let response = await login(credentialResponse);
      setAuthToken(response.access_token);
      await refresh();
      message.success('Đăng nhập thành công!');
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params as { redirect: string };
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substring(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substring(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }

      navigate(redirect || '/', { replace: true });
      return true;
    } catch (err) {
      console.log('login error: ', err);
      return false;
    }
  };
  return (
    <GoogleOAuthProvider clientId={GoogleSSOConfig.GOOGLE_CLIENT_ID}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'auto',
          background: '#f0f2f5',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 110px',
          backgroundSize: '100%',
        }}
      >
        <ExLoginForm
          logo="https://www.peakxv.com/wp-content/uploads/sites/2/2022/03/logo_trustingsocial.png"
          title={'Finops Management System Portal'}
          subTitle={'v1.0.0 - Billing, Costing and Assets Management '}
        >
          <center>
            <GoogleLogin
              theme="filled_blue"
              width="200"
              size="medium"
              onSuccess={responseMessage}
              onError={() => console.log('fail')}
            />
          </center>
        </ExLoginForm>
      </div>
    </GoogleOAuthProvider>
  );
};
