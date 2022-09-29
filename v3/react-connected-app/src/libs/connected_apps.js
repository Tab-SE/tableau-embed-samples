const jose = require('jose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

export async function encode(env_vars) {
  console.log(env_vars);
  // tableau connected app (JWT)
  // https://help.tableau.com/current/online/en-us/connected_apps.htm#step-3-configure-the-jwt

  const date = new Date().getMinutes();

  const exp = date + 9;

  const header = {
    "iss": env_vars.REACT_APP_TABLEAU_CA_CLIENT,
    "kid": env_vars.REACT_APP_TABLEAU_CA_SECRET_ID,
    "alg": "HS256",
    "typ": "JWT"
  }

  const payload = {
    "sub": env_vars.REACT_APP_TABLEAU_USERNAME,
    "aud": "tableau",
    "exp": exp,
    "jti": uuidv4(),
    "scp": ["tableau:content:read", "tableau:workbooks:create"]
  }

  const connected_app_secret = crypto.createSecretKey(env_vars.REACT_APP_TABLEAU_CA_SECRET_VALUE, 'utf-8');

  // const secretKey = createSecretKey(process.env.JWT_SECRET, 'utf-8');

  const jwt = await new jose.SignJWT({ 'scp': ["tableau:content:read", "tableau:workbooks:create"] })
  .setProtectedHeader(header)
  .setIssuer(env_vars.REACT_APP_TABLEAU_CA_CLIENT)
  .setAudience('tableau')
  .setExpirationTime(exp)
  .setJti(uuidv4())
  .sign(connected_app_secret)

  console.log(jwt)

  return jwt;
}

// encode(process.env);

// Header
// const oHeader = {alg: 'HS256', typ: 'JWT'};

// Payload
// const oPayload = {};
// const tNow = KJUR.jws.IntDate.get('now');
// const tEnd = KJUR.jws.IntDate.get('now + 1day');
// oPayload.iss = "http://foo.com";
// oPayload.sub = "mailto:mike@foo.com";
// oPayload.nbf = tNow;
// oPayload.iat = tNow;
// oPayload.exp = tEnd;
// oPayload.jti = "id123456";
// oPayload.aud = "http://foo.com/employee";
// // Sign JWT, password=616161
// const sHeader = JSON.stringify(oHeader);
// const sPayload = JSON.stringify(oPayload);
// const sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "616161");

// def encode(env_vars):
//   # tableau connected app variables (JWT) see: https://help.tableau.com/current/online/en-us/connected_apps.htm#step-3-configure-the-jwt
//   header_data = {
//     "iss": env_vars["TABLEAU_CA_CLIENT"],
//     "kid": env_vars["TABLEAU_CA_SECRET_ID"],
//     "alg": "HS256",
//   }

//   payload_data = {
//     "iss": env_vars["TABLEAU_CA_CLIENT"],
//     "sub": env_vars["TABLEAU_USERNAME"],
//     "aud": "tableau",
//     "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=5),
//     "jti": str(uuid.uuid4()),
//     "scp": ["tableau:content:read", "tableau:workbooks:create"]
//   }

//   connected_app_secret = env_vars["TABLEAU_CA_SECRET_VALUE"]

//   try:
//     token = jwt.encode(
//       payload = payload_data,
//       key = connected_app_secret,
//       headers = header_data
//     )
  
//   except Exception as error:
//     raise exceptions.JWTEncodingError(error)
  
//   else:
//     log.logger.info(f"token created: {token}")
//     print(f"token created: {token}")
//     # decode the token for access logging and testing
//     decode(token, connected_app_secret, payload_data["aud"], header_data["alg"])
//     return 
