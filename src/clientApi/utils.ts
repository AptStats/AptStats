import { Types } from "aptos";
import { BCS } from "aptos"

/**
 * Helper function for exhaustiveness checks.
 *
 * Hint: If this function is causing a type error, check to make sure that your
 * switch statement covers all cases!
 */
export function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

/*
If the transaction doesn't have a version property,
that means it's a pending transaction (and thus it's expected version will be higher than any existing versions).
We can consider the version to be Infinity for this case.
*/
export function sortTransactions(
  a: Types.Transaction,
  b: Types.Transaction,
): number {
  const first = "version" in a ? parseInt(a.version) : Infinity;
  const second = "version" in b ? parseInt(b.version) : Infinity;

  return first < second ? 1 : -1;
}

/*
Converts a utf8 string encoded as hex back to string
if hex starts with 0x - ignore this part and start from the 3rd char (at index 2).
*/
export function hex_to_string(hex: string): string {
  const hexString = hex.toString();
  let str = "";
  let n = hex.startsWith("0x") ? 2 : 0;
  for (n; n < hexString.length; n += 2) {
    str += String.fromCharCode(parseInt(hexString.substring(n, n + 2), 16));
  }

  return str;
}

import moment from "moment";

function ensureMillisecondTimestamp(timestamp: string): number {
  /*
  Could be: 1646458457
        or: 1646440953658538
   */
  if (timestamp.length > 13) {
    timestamp = timestamp.slice(0, 13);
  }
  if (timestamp.length == 10) {
    timestamp = timestamp + "000";
  }

  return parseInt(timestamp);
}

export function parseTimestamp(timestamp: string): moment.Moment {
  return moment(ensureMillisecondTimestamp(timestamp));
}

export interface TimestampDisplay {
  formatted: string;
  local_formatted: string;
  local_formatted_short: string;
  formatted_time_delta: string;
}

export function timestampDisplay(timestamp: moment.Moment): TimestampDisplay {
  return {
    formatted: timestamp.format("MM/DD/YY HH:mm:ss [UTC]"),
    local_formatted: timestamp.local().format("MM/DD/YYYY HH:mm:ss"),
    local_formatted_short: timestamp.local().format("MM/DD/YY HH:mm"),
    formatted_time_delta: timestamp.fromNow(),
  };
}

function truncate(
  str: string,
  frontLen: number,
  backLen: number,
  truncateStr: string,
) {
  if (!str) {
    return "";
  }

  if (!Number.isInteger(frontLen) || !Number.isInteger(backLen)) {
    throw `${frontLen} and ${backLen} should be an Integer`;
  }

  const strLen = str.length;

  // Setting default values
  frontLen = frontLen;
  backLen = backLen;
  truncateStr = truncateStr || "…";
  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= strLen ||
    backLen >= strLen ||
    frontLen + backLen >= strLen
  ) {
    return str;
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr;
  } else {
    return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen);
  }
}

export function truncateAddress(accountAddress: string) {
  return truncate(accountAddress, 6, 4, "…");
}

export function truncateAddressMiddle(accountAddress: string) {
  return truncate(accountAddress, 20, 20, "…");
}

export function isValidAccountAddress(accountAddr: string): boolean {
  // account address is 0x{64 hex characters}
  // with multiple options - 0X, 0x001, 0x1, 0x01
  // can start with that and see if any fails to parsing
  return /^(0[xX])?[a-fA-F0-9]{1,64}$/.test(accountAddr);
}

export function isValidTxnHashOrVersion(txnHashOrVersion: string): boolean {
  return isHex(txnHashOrVersion) || isNumeric(txnHashOrVersion);
}

export function isHex(text: string) {
  // if it's hex, and is <= (64 + 2 for 0x) char long
  return text.startsWith("0x") && text.length <= 66;
}

export function isNumeric(text: string) {
  return /^-?\d+$/.test(text);
}

export function getFormattedTimestamp(timestamp?: string): string {
  if (!timestamp || timestamp === "0") return "-";

  const moment = parseTimestamp(timestamp);
  const timestamp_display = timestampDisplay(moment);

  return timestamp_display.local_formatted;
}

export function getTableFormattedTimestamp(timestamp?: string): string {
  if (!timestamp || timestamp === "0") return "-";

  const moment = parseTimestamp(timestamp);
  const timestamp_display = timestampDisplay(moment);

  return timestamp_display.local_formatted_short;
}

// eslint-disable-next-line react-hooks/exhaustive-deps
export function vectorToString(hexString: string) {
  if (!hexString) return ''

  return new TextDecoder('utf-8').decode(hexToUint8Array(hexString))
}

export function hexToUint8Array(hexString: string) {
  return Uint8Array.from(
    hexString.replace("0x", "").match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
  )
}

export function hexToU64(hexString: string) {
  return Number(new BCS.Deserializer(hexToUint8Array(hexString)).deserializeU64())
}


export function is_valid_amount(amount: string, allow_zero = false) {
  return !isNaN(+amount) && (allow_zero ? true : +amount > 0)
}

export function is_valid_address(address: string) {
  return /^0x[0-9a-fA-F]{64}$/.test(address)
}

export function numberWithCommas(x: number, decimals = 2) {
  return x.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const format = (num: number, currency = false, digits = 2) =>
  Intl.NumberFormat('en', {
    notation: 'compact',
    ...(currency
      ? {
        style: 'currency',
        currency: 'USD'
      }
      : {}),
    ...(digits > 0 ?
      { maximumSignificantDigits: digits } : {})
  }).format(num).toLowerCase()
