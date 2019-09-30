interface Opts {
  singular: string;
  plural: string
}

export default (num: number, opts: Opts) => num === 1 ? `${num} ${opts.singular}` : `${num} ${opts.plural}`
