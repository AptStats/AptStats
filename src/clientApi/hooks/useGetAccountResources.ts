import { Types } from "aptos";
import { useQuery, UseQueryResult } from "react-query";
import { getAccountResources } from "..";
import { ResponseError } from "../client";
import { useGlobalState } from "../GlobalState";

export function useGetAccountResources(
  address: string,
): UseQueryResult<Types.MoveResource[], ResponseError> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, _setState] = useGlobalState();

  const accountResourcesResult = useQuery<
    Array<Types.MoveResource>,
    ResponseError
  >(["accountResources", { address }, state.network_value], () =>
    getAccountResources({ address }, state.network_value),
  );

  return accountResourcesResult;
}
