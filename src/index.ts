import type { IOptions } from './@types/options';
import type { IConstructorParams, TEncoding } from './@types/params';
import Builder from './bin/xml-builder';

const ENCODINGS: Set<TEncoding> = new Set([
  'UTF-8',
  'UTF-16',
  'UCS-2',
  'UCS-4',
  'ISO-10646-UCS-2',
  'UNICODE-1-1-UTF-8',
  'UNICODE-2-0-UTF-16',
  'UNICODE-2-0-UTF-8',
  'US-ASCII',
  'ISO-8859-1',
  'ISO-8859-2',
  'ISO-8859-3',
  'ISO-8859-4',
  'ISO-8859-5',
  'ISO-8859-6',
  'ISO-8859-7',
  'ISO-8859-8',
  'ISO-8859-9',
  'WINDOWS-1250',
  'WINDOWS-1251',
  'WINDOWS-1252',
  'WINDOWS-1253',
  'WINDOWS-1254',
  'WINDOWS-1255',
  'WINDOWS-1256',
  'WINDOWS-1257',
  'WINDOWS-1258'
]);

const DEFAULT_CONFIG: IConstructorParams = {
  encoding: 'UTF-8',
  tab: '  ',
  pretty: false,
  typed: false,
  preamble: true,
  rootName: 'root',
  depth: 'Infinity'
};

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
    if (options === undefined) return new Builder(DEFAULT_CONFIG);

    if (typeof options.typed !== 'boolean') options.typed = false;
    if (typeof options.preamble !== 'boolean') options.preamble = false;
    if (typeof options.rootName !== 'string' || (typeof options.rootName === 'string' && options.rootName.length === 0)) options.rootName = 'root';
    if (typeof options.pretty !== 'boolean') options.pretty = false;

    let tab = '  ';
    if (options.pretty && options.tabWidth !== undefined) {
      if (typeof options.tabWidth === 'number' && options.tabWidth > 0) tab = ' '.repeat(options.tabWidth);
      else if (options.tabWidth === 'tab') tab = '\t';
    }
    let depth: number | 'Infinity' = 'Infinity';
    if (options.depth !== 'Infinity' && typeof options.depth === 'number' && options.depth > 0) depth = options.depth;

    let encoding: TEncoding = 'UTF-8';
    if (options.encoding !== undefined && ENCODINGS.has(options.encoding)) encoding = options.encoding;

    return new Builder({
      rootName: options.rootName,
      pretty: options.pretty,
      typed: options.typed,
      preamble: options.preamble,
      encoding: encoding,
      tab: tab,
      depth: depth
    });
  }
}
