import React, { ReactElement } from "react";
import { FormFieldWrapperProps } from "components/FormFieldWrapper";
import { useMyFormLogic } from "components/MyForm/MyForm.logic";
import { MyFormField } from "components/MyForm/MyFormField";
import styles from "./MyForm.module.css";

export interface MyFormProps {
  children: ReactElement<FormFieldWrapperProps>[];

  values: { [id: string]: string };
  errors: { [id: string]: string };
  formState: string;

  onFormSubmit: (values: { [id: string]: string }) => void;
  onValueChange: (values: { [id: string]: string }) => void;
}

export const MyForm = (props: MyFormProps) => {

  const logic = useMyFormLogic(props);
  const { values, errors, formState } = props;

  const getInputHandler = logic.useOnInput();
  const [startedFlags, setStartedFlagForId, setAllToTrue] = logic.useStartedFlags();

  return <form onSubmit={(event) => {
    event.preventDefault();
    setAllToTrue();
    props.onFormSubmit(props.values);
  }}>
    {
      props.children.map((e, i) => (
        <MyFormField
          {...e.props}
          key={i}
          value={values[e.props.id]}
          error={(startedFlags[e.props.id] && errors[e.props.id]) as string}
          onInput={(event) => {
            setStartedFlagForId(e.props.id)
            getInputHandler(e.props.id)(event)
          }}
        />
      ))
    }
    <button>Submit</button>
    <p className={styles["state"]}>{formState}</p>
  </form>;
}
