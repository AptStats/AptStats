import { useGlobalState } from "../GlobalState";
import { useEffect, useState } from "react";
import { useGetAccountResource } from "./useGetAccountResource";

interface ValidatorSetData {
  active_validators: Validator[];
  total_voting_power: string;
}

export interface Validator {
  addr: string;
  config: {
    consensus_pubkey: string;
    fullnode_addresses: string;
    network_addresses: string;
    validator_index: string;
  };
  voting_power: string;
}

export interface ValidatorPerformance {
  successful_proposals: number,
  failed_proposals: number
}

export function useGetValidatorSet() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, _] = useGlobalState();
  const [totalVotingPower, setTotalVotingPower] = useState<string | null>(null);
  const [numberOfActiveValidators, setNumberOfActiveValidators] = useState<
    number | null
  >(null);
  const [activeValidators, setActiveValidators] = useState<Validator[]>([]);
  const [validatorPerformances, setValidatorPerformances] = useState<ValidatorPerformance[]>([]);

  const { accountResource: validatorSet } = useGetAccountResource(
    "0x1",
    "0x1::stake::ValidatorSet",
  );

  const { accountResource: validatorPerformanceSet } = useGetAccountResource("0x1", "0x1::stake::ValidatorPerformance");

  useEffect(() => {
    if (validatorSet?.data !== undefined) {
      const data = validatorSet.data as ValidatorSetData;
      setTotalVotingPower(data.total_voting_power);
      setNumberOfActiveValidators(data.active_validators.length);
      setActiveValidators(data.active_validators);
    }

    if (validatorPerformanceSet?.data !== undefined) {
      setValidatorPerformances((validatorPerformanceSet.data as any).validators as ValidatorPerformance[])
    }
  }, [validatorSet?.data, state, validatorPerformanceSet?.data]);

  return {
    totalVotingPower, numberOfActiveValidators, activeValidators,
    validatorPerformances
  };
}
