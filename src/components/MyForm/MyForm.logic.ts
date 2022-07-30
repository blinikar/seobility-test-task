import { MyFormProps } from "components/MyForm/MyForm";
import { FormEvent, useEffect, useState } from "react";

export const useMyFormLogic = (props: MyFormProps) => {
  return {
    useOnInput: () => {
      return (id: string) => {
        return (event: FormEvent<HTMLInputElement>) => {
          const newValues = { ...props.values };
          newValues[id] = event.currentTarget.value;
          props.onValueChange(newValues);
        }
      }
    },
    useStartedFlags: ():[
      startedFlags: { [id: string]: boolean },
      setStartedFlag: (id: string) => void,
      setAllToTrue: () => void
    ] => {
      const [startedFlags, setStartedFlags] = useState<{ [id: string]: boolean }>({});

      useEffect(() => {
        const newStartedFlags = { ...startedFlags };
        for (const id in props.values) newStartedFlags[id] = false;
        setStartedFlags(newStartedFlags);
      }, []);

      const setStartedFlagForId = (id: string) => {
        const newStartedFlags = { ...startedFlags };
        newStartedFlags[id] = true;
        setStartedFlags(newStartedFlags);
      }

      const setAllToTrue = () => {
        const newStartedFlags = { ...startedFlags };
        for (const id in newStartedFlags) newStartedFlags[id] = true;
        setStartedFlags(newStartedFlags);
      }

      return [startedFlags, setStartedFlagForId, setAllToTrue];
    }
  }
}
