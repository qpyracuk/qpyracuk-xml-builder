import type { IOptions } from './@types/options';
import Builder from './bin/xml-builder';

/**
 * @class XML Tools
 */
export default class XML {
  /**
   * @description Creates an instance of the XML generator class
   * @param {IOptions} options build options
   * @returns {Builder} XML-builder instance
   * @static
   */
  static createBuilder(options?: IOptions): Builder {
    if (options === undefined)
      return new Builder({
        encoding: 'UTF-8',
        tab: '  ',
        pretty: false,
        typed: false,
        preamble: true
      });
    const pretty: boolean | undefined = options.pretty,
      typed: boolean | undefined = options.typed,
      preamble: boolean | undefined = options.preamble,
      tabWidth: number | 'tab' | undefined = options.pretty ? options.tabWidth : undefined;

    let innerPretty: boolean, innerTyped: boolean, innerPreamble: boolean, innerTabWidth: string;

    if (pretty !== undefined && typeof pretty === 'boolean') innerPretty = pretty;
    else innerPretty = false;

    if (typed !== undefined && typeof typed === 'boolean') innerTyped = typed;
    else innerTyped = false;

    if (preamble !== undefined && typeof preamble === 'boolean') innerPreamble = preamble;
    else innerPreamble = false;

    if (tabWidth === undefined) innerTabWidth = '  ';
    else {
      if (typeof tabWidth === 'number' && tabWidth > 0) innerTabWidth = ' '.repeat(tabWidth);
      else if (tabWidth === 'tab') innerTabWidth = '\t';
      else innerTabWidth = '  ';
    }

    return new Builder({
      encoding: 'UTF-8',
      tab: innerTabWidth,
      pretty: innerPretty,
      typed: innerTyped,
      preamble: innerPreamble
    });
  }
}
