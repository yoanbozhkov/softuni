function sign(
  payload: string | object | Buffer,
  secret: string
): Promise<string>;
const verify = (
  token: string,
  secretOrPublicKey: Secret,
  options: VerifyOptions & { complete: true }
) => Promise<string>;
export = { sign };
