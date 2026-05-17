import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8180/realms/taskmanager',
  redirectUri: window.location.origin,
  clientId: 'taskmanager-web',
  responseType: 'code',
  scope: 'openid profile',
  sessionChecksEnabled: false
};
