declare module "nostringer" {
  function sign(
    message: string,
    privateKey: string,
    ringPublicKeys: string[]
  ): Promise<unknown>;
  function verify(
    message: string,
    signature: unknown,
    ringPublicKeys: string[]
  ): Promise<boolean>;

  export { sign, verify };
}
