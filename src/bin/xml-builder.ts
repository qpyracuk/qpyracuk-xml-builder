import type { IConstructorParams } from '@/@types/params';
import type { INode } from '@qpyracuk/iterator';
import Iterator from '@qpyracuk/iterator';

const PRIMITIVES = new Set(['number', 'string', 'boolean', 'symbol', 'bigint']);

const typeMap = new Map<string, string>([
  ['number', ' type="number"'],
  ['string', ' type="string"'],
  ['boolean', ' type="boolean"'],
  ['bigint', ' type="bigint"'],
  ['symbol', ' type="symbol"'],
  ['object', ' type="object"'],
  ['array', ' type="array"'],
  ['map', ' type="map"'],
  ['set', ' type="set"'],
  ['undefined', ' type="undefined"'],
  ['function', ' type="function"'],
  ['', '']
]);

export default class Builder {
  /** Tab generator */
  private $__tab: (level: number) => string;
  /** Tab symbols */
  private $__tabString: string;
  /** Tab map */
  private $__tabMap: Map<number, string> = new Map();
  /** Break generator */
  private $nextLine: string;
  /** Type generator */
  private $__typeGenerator: ((type: string) => string) | (() => string);
  /** Start string */
  private $__start: string;
  /** Safety value */
  private $__safeValue(value: unknown): string {
    if (typeof value === 'string') return value.replace(/(<|>)/g, '');
    else return String(value);
  }
  /** Safety key */
  private $__safeKey(key: string) {
    if (/^\d+$/.test(key)) {
      return `i${String(key)}`;
    } else return key;
  }

  constructor(params: IConstructorParams) {
    const encoding = params.encoding;
    const pretty = params.pretty;
    const typed = params.typed;
    const tab = params.tab;
    const preamble = params.preamble;
    this.$__tabString = tab;
    if (pretty) {
      this.$__tab = this.$__tabGeneratorMethod.bind(this);
      this.$nextLine = '\n';
    } else {
      this.$__tab = () => '';
      this.$nextLine = '';
    }
    this.$__typeGenerator = typed ? this.$__typeGeneratorMethod.bind(this) : () => '';
    this.$__start = preamble ? `<?xml version="1.0" encoding="${encoding}"?>${this.$nextLine}` : '';
  }

  /**
   * @description Serializes data into XML
   * @param {any} data Any data
   * @returns {string} XML
   */
  public stringify(data: unknown): string {
    const iterator = Iterator.createDepthFirstIterator(data);
    const stack: INode[] = [];
    let deepLevel = 0,
      closeTag: INode | undefined,
      parentTag: INode | undefined,
      node: INode;
    let xml: string = this.$__start;

    while (iterator.has()) {
      node = iterator.next() as INode;
      while (node.level < deepLevel && stack.length > 0) {
        closeTag = stack.pop();
        --deepLevel;
        if (closeTag !== undefined) {
          parentTag = stack[stack.length - 1];
          xml +=
            parentTag === undefined || (parentTag !== undefined && (parentTag.type === 'object' || parentTag.type === 'map'))
              ? `${this.$__tab(closeTag.level)}</${this.$__safeKey(closeTag.key)}>${this.$nextLine}`
              : `${this.$__tab(closeTag.level)}</i>${this.$nextLine}`;
        }
      }
      xml += this.$__buildTag(node, stack);
      deepLevel = node.level;
    }
    while (stack.length > 0) {
      closeTag = stack.pop();
      parentTag = stack[stack.length - 1];
      if (closeTag !== undefined) {
        if (parentTag === undefined || (parentTag !== undefined && (parentTag.type === 'object' || parentTag.type === 'map'))) {
          xml += `${this.$__tab(closeTag.level)}</${this.$__safeKey(closeTag.key)}>${this.$nextLine}`;
        } else {
          xml += `${this.$__tab(closeTag.level)}</i>${this.$nextLine}`;
        }
      }
    }
    return xml;
  }

  private $__buildTag(node: INode, stack: INode[]) {
    const parentTag = stack[stack.length - 1];
    const key = this.$__safeKey(node.key);
    const tab = this.$__tab(node.level);
    const isPrimitive = PRIMITIVES.has(node.type);
    if (!isPrimitive) stack.push(node);
    return parentTag === undefined
      ? isPrimitive
        ? `${tab}<${key}${this.$__typeGenerator(node.type)}>${this.$__safeValue(node.value)}</${key}>${this.$nextLine}`
        : `${tab}<${key}${this.$__typeGenerator(node.type)}>${this.$nextLine}`
      : isPrimitive
        ? parentTag.type === 'object' || parentTag.type === 'map'
          ? `${tab}<${key}${this.$__typeGenerator(node.type)}>${this.$__safeValue(node.value)}</${key}>${this.$nextLine}`
          : `${tab}<i${this.$__typeGenerator(node.type)}>${this.$__safeValue(node.value)}</i>${this.$nextLine}`
        : parentTag.type === 'object' || parentTag.type === 'map'
          ? `${tab}<${key}${this.$__typeGenerator(node.type)}>${this.$nextLine}`
          : `${tab}<i${this.$__typeGenerator(node.type)}>${this.$nextLine}`;
  }

  private $__tabGeneratorMethod(level: number): string {
    let tab: string | undefined = this.$__tabMap.get(level);
    if (tab === undefined) this.$__tabMap.set(level, (tab = this.$__tabString.repeat(level)));
    return tab;
  }

  private $__typeGeneratorMethod(type: string) {
    return typeMap.get(type) as string;
  }
}
