interface IBaseOptions {
  /**
   * @description Embed a preamble at the beginning
   */
  preamble?: boolean;
  /**
   * @description Encoding specified in the XML preamble
   */
  encoding?: 'UTF-8' | 'UTF-16' | 'Unicode' | 'win-1251';
  /**
   * @description XML-builder will produce typed XML
   */
  typed?: boolean;
}
interface INonPrettyOptions extends IBaseOptions {
  /**
   * @description Tab width in "pretty" mode
   */
  pretty?: false;
}

interface IPrettyOptions extends IBaseOptions {
  /**
   * @description XML-builder will produce human readable XML
   */
  pretty: true;
  /**
   * @description Tab width in "pretty" mode
   */
  tabWidth?: number | 'tab';
}

export type IOptions = IPrettyOptions | INonPrettyOptions;
