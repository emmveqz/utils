
import type {
  IAsyncTryCatch,
  IEnumLike,
  ITryCatch,
  IValOf,
  IWithAsyncTryCatch,
  IWithTryCatch,
} from "./types/utils"

//

export const AssertIpv4 = (ip: string): boolean => {
  return ip.search(/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/g) > -1
}

export class IpV4 {
  public static From(ip: string): IpV4 {
    let cleanIp	= String(ip || "").trim()
    cleanIp		= AssertIpv4(cleanIp) ? cleanIp : ""

    const ipV4	= new IpV4(cleanIp, !!cleanIp.length)
    return ipV4
  }

  private constructor(public readonly Val: string, public readonly Valid: boolean) {}

  public equals(ip: IpV4|string): boolean {
    return ip instanceof IpV4 ? ip.Val === this.Val : ip === this.Val
  }
}

export const DayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000)
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)

  return day
}

export const FirstSundayOfMonth = (date: Date): Date => {
  const copy = new Date( date.getTime() )
  const day = copy.getDay()

  if (!!day) {
    copy.setHours(-24 * day)
    copy.setHours(24 * 7)
  }
  return copy
}

export const LastSundayPrevMonth = (date: Date): Date => {
  const copy = new Date( date.getTime() )
  const day = copy.getDay() || 7
  copy.setHours(-24 * day)

  return copy
}

export const Sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms)
  })
}

export const ArrayUnique = <T>(arr: Array<T>): Array<T> => {
  return arr.filter((val, idx, arr2) =>
    // tslint:disable-next-line: trailing-comma
    arr2.indexOf(val) === idx
  )
}

export const ArraySum = (arr: Array<number>): number => {
  return arr.reduce((total, val) => total + val, 0)
}

export const RegExps = {
  Email: /^[a-zA-Z0-9]+(?:[.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9]+)?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9]))+$/,
  RealNumber: /^[+-]?(?:\d+\.?\d*|\d*\.\d+)$/,
}

export const extractEnumNumbers = <T extends IEnumLike>(en: T): Array< IValOf<T, string> > => {
  return Object
    .values(en as { [prop: string]: IValOf<T, string> })
    .filter((val) => typeof val === typeof 1)
}

export const tryCatch: ITryCatch = (func, ...args) => {
  try {
    return func(...args)
  }
  catch (ex) {
    return new Error((ex as Error).message)
  }
}

export const asyncTryCatch: IAsyncTryCatch = async (func, ...args) => {
  try {
    return await func(...args)
  }
  catch (ex) {
    return new Error((ex as Error).message)
  }
}

export const withTryCatch: IWithTryCatch = (func) => {
  return (...args) => tryCatch(func, ...args)
}

export const withAsyncTryCatch: IWithAsyncTryCatch = (func) => {
  return (...args) => asyncTryCatch(func, ...args)
}

