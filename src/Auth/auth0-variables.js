// each Project 3 developer must create an Auth0 account and copy the Domain and Client ID strings to their respective locations above

// each user must then configure whichever social media connections that they would like the Auth0 service to present to users at login...Google, Facebook, etc...
// https://manage.auth0.com/#/connections/social
// generate the necessary credentials on the social connection's website and enter them into the corresponding configuration settings in Auth0 Dashboard



export const AUTH_CONFIG = {
  domain: // 'your auth0 domain name',
  clientId: // 'your auth0 clientId,
  callbackUrl: 'http://localhost:3000/callback' // will need to change callback URI once in production
}

