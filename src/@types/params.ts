export type TEncoding =
  | 'UTF-8'
  | 'UTF-16'
  | 'UCS-2'
  | 'UCS-4'
  | 'ISO-10646-UCS-2'
  | 'UNICODE-1-1-UTF-8'
  | 'UNICODE-2-0-UTF-16'
  | 'UNICODE-2-0-UTF-8'
  | 'US-ASCII'
  | 'ISO-8859-1'
  | 'ISO-8859-2'
  | 'ISO-8859-3'
  | 'ISO-8859-4'
  | 'ISO-8859-5'
  | 'ISO-8859-6'
  | 'ISO-8859-7'
  | 'ISO-8859-8'
  | 'ISO-8859-9'
  | 'WINDOWS-1250'
  | 'WINDOWS-1251'
  | 'WINDOWS-1252'
  | 'WINDOWS-1253'
  | 'WINDOWS-1254'
  | 'WINDOWS-1255'
  | 'WINDOWS-1256'
  | 'WINDOWS-1257'
  | 'WINDOWS-1258';

export interface IConstructorParams {
  encoding: TEncoding;
  typed: boolean;
  pretty: boolean;
  tab: string;
  preamble: boolean;
  rootName: string;
  depth: number | 'Infinity';
}
